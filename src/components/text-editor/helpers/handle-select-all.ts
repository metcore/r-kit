import { AllSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

export default function handleSelectAll(
  view: EditorView,
  event: KeyboardEvent
) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'a') {
    event.preventDefault();
    const { state, dispatch } = view;
    dispatch(state.tr.setSelection(new AllSelection(state.doc)));
    return true;
  }
  return false;
}
