import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { cn, fieldHasError } from '../../lib/utils';
import { FormField, FormHint, FormErrorMessages } from '../form';
import { Icon } from '../icons';
import type { DrawingProps, DrawingRef } from './type';
import { Button } from '../button';

const DEFAULT_STROKE_COLOR = '#000000';
const DEFAULT_STROKE_WIDTH = 2;
const DEFAULT_BACKGROUND = 'transparent';
const DEFAULT_HEIGHT = 200;

const Drawing = forwardRef<DrawingRef, DrawingProps>(
  (
    {
      strokeColor = DEFAULT_STROKE_COLOR,
      strokeWidth = DEFAULT_STROKE_WIDTH,
      backgroundColor = DEFAULT_BACKGROUND,
      height = DEFAULT_HEIGHT,
      width = '100%',
      disabled = false,
      readOnly = false,
      showActions = false,
      placeholder,
      initialValue,
      onChange,
      className,
      style,
      label,
      description,
      hint,
      errorMessages,
      required,
      size,
      tooltip,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawingRef = useRef(false);
    const emptyRef = useRef(true);
    const initialValueLoadedRef = useRef(false);
    const [isEmpty, setIsEmpty] = useState(true);

    const historyRef = useRef<(string | null)[]>([null]);
    const historyIndexRef = useRef(0);
    const restoreTokenRef = useRef(0);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    const hasError = fieldHasError(errorMessages);
    const isInteractive = !disabled && !readOnly;

    const fillBackground = useCallback(
      (ctx: CanvasRenderingContext2D, w: number, h: number): void => {
        if (!backgroundColor || backgroundColor === 'transparent') return;
        ctx.save();
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      },
      [backgroundColor]
    );

    const syncHistoryFlags = useCallback((): void => {
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
    }, []);

    const restore = useCallback(
      (snapshot: string | null): void => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx) return;

        const token = ++restoreTokenRef.current;
        const cssW = canvas.offsetWidth;
        const cssH = canvas.offsetHeight;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        fillBackground(ctx, cssW, cssH);

        if (snapshot !== null) {
          const img = new Image();
          img.onload = () => {
            if (token !== restoreTokenRef.current) return;
            ctx.drawImage(img, 0, 0, cssW, cssH);
          };
          img.src = snapshot;
          emptyRef.current = false;
          setIsEmpty(false);
        } else {
          emptyRef.current = true;
          setIsEmpty(true);
        }
      },
      [fillBackground]
    );

    const pushHistory = useCallback(
      (snapshot: string | null): void => {
        const next = historyRef.current.slice(0, historyIndexRef.current + 1);
        next.push(snapshot);
        historyRef.current = next;
        historyIndexRef.current = next.length - 1;
        syncHistoryFlags();
      },
      [syncHistoryFlags]
    );

    const setupCanvas = useCallback((): void => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const cssW = canvas.offsetWidth;
      const cssH = canvas.offsetHeight;
      if (cssW === 0 || cssH === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const snapshot = emptyRef.current ? null : canvas.toDataURL();

      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctxRef.current = ctx;

      fillBackground(ctx, cssW, cssH);

      if (snapshot !== null) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, cssW, cssH);
        img.src = snapshot;
      } else if (
        initialValue != null &&
        initialValue !== '' &&
        !initialValueLoadedRef.current
      ) {
        initialValueLoadedRef.current = true;
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, cssW, cssH);
          emptyRef.current = false;
          setIsEmpty(false);
          pushHistory(canvas.toDataURL());
        };
        img.src = initialValue;
      }
    }, [fillBackground, initialValue, pushHistory]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      setupCanvas();
      const observer = new ResizeObserver(() => setupCanvas());
      observer.observe(canvas);
      return () => observer.disconnect();
    }, [setupCanvas]);

    const getPoint = (
      e: ReactPointerEvent<HTMLCanvasElement>
    ): { x: number; y: number } => {
      const canvas = e.currentTarget;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.offsetWidth / rect.width;
      const scaleY = canvas.offsetHeight / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const handlePointerDown = (
      e: ReactPointerEvent<HTMLCanvasElement>
    ): void => {
      if (!isInteractive) return;
      const ctx = ctxRef.current;
      if (!ctx) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);

      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = strokeColor;
      ctx.lineWidth = strokeWidth;

      const { x, y } = getPoint(e);
      ctx.beginPath();
      ctx.arc(x, y, strokeWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x, y);

      isDrawingRef.current = true;
      if (emptyRef.current) {
        emptyRef.current = false;
        setIsEmpty(false);
      }
    };

    const handlePointerMove = (
      e: ReactPointerEvent<HTMLCanvasElement>
    ): void => {
      if (!isDrawingRef.current) return;
      const ctx = ctxRef.current;
      if (!ctx) return;
      e.preventDefault();
      const { x, y } = getPoint(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const handlePointerUp = (e: ReactPointerEvent<HTMLCanvasElement>): void => {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      const canvas = canvasRef.current;
      if (!canvas) return;
      const snapshot = canvas.toDataURL();
      pushHistory(snapshot);
      onChange?.(snapshot);
    };

    const undo = useCallback((): void => {
      if (historyIndexRef.current <= 0) return;
      historyIndexRef.current -= 1;
      const snapshot = historyRef.current[historyIndexRef.current];
      restore(snapshot);
      syncHistoryFlags();
      onChange?.(snapshot ?? '');
    }, [restore, syncHistoryFlags, onChange]);

    const redo = useCallback((): void => {
      if (historyIndexRef.current >= historyRef.current.length - 1) return;
      historyIndexRef.current += 1;
      const snapshot = historyRef.current[historyIndexRef.current];
      restore(snapshot);
      syncHistoryFlags();
      onChange?.(snapshot ?? '');
    }, [restore, syncHistoryFlags, onChange]);

    const clear = useCallback((): void => {
      const current = historyRef.current[historyIndexRef.current];
      restore(null);
      if (current !== null) pushHistory(null);
      onChange?.('');
    }, [restore, pushHistory, onChange]);

    useImperativeHandle(
      ref,
      () => ({
        clear,
        undo,
        redo,
        canUndo: () => historyIndexRef.current > 0,
        canRedo: () => historyIndexRef.current < historyRef.current.length - 1,
        isEmpty: () => emptyRef.current,
        toDataURL: (type, quality) =>
          canvasRef.current?.toDataURL(type, quality) ?? '',
        toBlob: (callback, type, quality) =>
          canvasRef.current
            ? canvasRef.current.toBlob(callback, type, quality)
            : callback(null),
        getCanvas: () => canvasRef.current,
      }),
      [clear, undo, redo]
    );

    const showPlaceholder =
      isEmpty && !disabled && !readOnly && Boolean(placeholder);

    const canUndoNow = isInteractive && canUndo;
    const canRedoNow = isInteractive && canRedo;
    const canClearNow = isInteractive && !isEmpty;

    const actionButtonCn = (enabled: boolean): string =>
      cn(
        'flex h-8 items-center justify-center rounded-lg transition-colors',
        enabled
          ? 'cursor-pointer hover:bg-gray-100'
          : 'cursor-not-allowed opacity-40'
      );

    const content = (
      <div className="flex w-full flex-col gap-2" style={{ width, ...style }}>
        <div
          className={cn(
            'relative w-full overflow-hidden rounded-lg border bg-white transition-colors',
            hasError
              ? 'border-danger-500 focus-within:border-danger-500'
              : 'focus-within:border-primary-300 border-gray-200',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          style={{ height }}
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={label ?? placeholder}
            tabIndex={isInteractive ? 0 : -1}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={cn(
              'block h-full w-full touch-none select-none focus:outline-none',
              isInteractive ? 'cursor-crosshair' : 'cursor-default bg-gray-900'
            )}
          />
          {showPlaceholder && (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-gray-400 select-none">
              {placeholder}
            </span>
          )}
        </div>

        {hint !== undefined && <FormHint size={size}>{hint}</FormHint>}

        {errorMessages !== undefined && (
          <FormErrorMessages messages={errorMessages} size={size} />
        )}

        {showActions && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={'tertiary'}
                type="button"
                onClick={undo}
                disabled={!canUndoNow}
                aria-label="Undo"
                className={cn('w-8 p-2', actionButtonCn(canUndoNow))}
              >
                <Icon name="arrow-back-alt" size={20} />
              </Button>
              <Button
                variant={'tertiary'}
                type="button"
                onClick={redo}
                color="primary"
                disabled={!canRedoNow}
                aria-label="Redo"
                className={cn('w-8 p-2', actionButtonCn(canRedoNow))}
              >
                <Icon name="arrow-forward-alt" size={20} />
              </Button>
            </div>
            <Button
              variant={'outline'}
              className={cn(
                'gap-1.5 px-3 py-2 text-sm font-medium',
                actionButtonCn(canClearNow)
              )}
              type="button"
              onClick={clear}
              color={canClearNow ? 'primary' : 'gray'}
              disabled={!canClearNow}
            >
              Clear
            </Button>
          </div>
        )}
      </div>
    );

    return (
      <FormField
        label={label}
        description={description}
        required={required}
        size={size}
        tooltip={tooltip}
      >
        {content}
      </FormField>
    );
  }
);

Drawing.displayName = 'Drawing';

export { Drawing };
