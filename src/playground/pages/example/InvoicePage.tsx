import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '../../../components/card';
import { Badge } from '../../../components/badge';
import { Button } from '../../../components/button';
import { Divider } from '../../../components/devider/devider';
import { Icon } from '../../../components/icons';
import { Text } from '../../../components/text';
import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
} from '../../../clients';

const ITEMS = [
  { name: 'Desain sistem antarmuka', qty: 1, price: 12_500_000 },
  { name: 'Implementasi komponen kit', qty: 24, price: 750_000 },
  { name: 'Dokumentasi & serah terima', qty: 1, price: 3_200_000 },
  { name: 'Dukungan teknis (3 bulan)', qty: 3, price: 1_500_000 },
];

const TAX_RATE = 0.11;

const rupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

function Party({
  role,
  name,
  lines,
}: {
  role: string;
  name: string;
  lines: string[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <Text variant="t2" className="text-gray-700" value={role} />
      <Text
        variant="p2"
        weight="semibold"
        className="text-gray-900"
        value={name}
      />
      {lines.map((line) => (
        <Text key={line} variant="t1" className="text-gray-800" value={line} />
      ))}
    </div>
  );
}

function TotalRow({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-8">
      <Text
        variant={emphasis ? 'p2' : 't1'}
        weight={emphasis ? 'semibold' : 'regular'}
        className={emphasis ? 'text-gray-900' : 'text-gray-800'}
        value={label}
      />
      <Text
        variant={emphasis ? 'p2' : 't1'}
        weight="semibold"
        className="text-gray-900"
        value={value}
      />
    </div>
  );
}

export default function InvoicePage() {
  const subtotal = ITEMS.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  return (
    <Card>
      <CardHeader
        divider
        className="flex flex-row items-center justify-between"
      >
        <Text
          as="h2"
          variant="p2"
          weight="semibold"
          className="text-gray-900"
          value="Invoice"
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" color="gray" className="gap-2">
            <Icon name="print" size={16} />
            Cetak
          </Button>
          <Button color="primary" className="gap-2">
            <Icon name="download" size={16} />
            Unduh PDF
          </Button>
        </div>
      </CardHeader>

      <CardBody className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Text
              as="h3"
              variant="h4"
              weight="bold"
              className="text-gray-900"
              value="INV/2026/08/0142"
            />
            <Text
              variant="t1"
              className="text-gray-800"
              value="Diterbitkan 12 Agustus 2026 · Jatuh tempo 26 Agustus 2026"
            />
          </div>
          <Badge color="warning">Menunggu Pembayaran</Badge>
        </div>

        <Divider />

        <div className="grid gap-6 sm:grid-cols-2">
          <Party
            role="Ditagihkan oleh"
            name="PT Herca Teknologi Nusantara"
            lines={[
              'Jl. Cikutra No. 204A, Bandung',
              'NPWP 01.234.567.8-901.000',
              'billing@herca.id',
            ]}
          />
          <Party
            role="Ditagihkan kepada"
            name="Koperasi Sumber Rejeki"
            lines={[
              'Jl. Diponegoro No. 17, Semarang',
              'NPWP 09.876.543.2-109.000',
              'finance@sumberrejeki.co.id',
            ]}
          />
        </div>

        <div className="overflow-auto">
          <Table variant="wrapped-row-bordered" className="w-full table-auto">
            <TableHead>
              <TableRow isHeader>
                <TableCellHead value="Deskripsi" />
                <TableCellHead value="Qty" />
                <TableCellHead value="Harga Satuan" />
                <TableCellHead value="Jumlah" />
              </TableRow>
            </TableHead>
            <TableBody>
              {ITEMS.map((item) => (
                <TableRow key={item.name}>
                  <TableCell value={item.name} />
                  <TableCell value={item.qty} />
                  <TableCell value={rupiah(item.price)} />
                  <TableCell value={rupiah(item.qty * item.price)} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end">
          <div className="flex w-full max-w-xs flex-col gap-2">
            <TotalRow label="Subtotal" value={rupiah(subtotal)} />
            <TotalRow label="PPN 11%" value={rupiah(tax)} />
            <Divider />
            <TotalRow label="Total Tagihan" value={rupiah(total)} emphasis />
          </div>
        </div>
      </CardBody>

      <CardFooter divider className="flex flex-col gap-1">
        <Text
          variant="t1"
          weight="semibold"
          className="text-gray-900"
          value="Pembayaran"
        />
        <Text
          variant="t1"
          className="text-gray-800"
          value="Transfer ke BCA 123 456 7890 a.n. PT Herca Teknologi Nusantara. Cantumkan nomor invoice pada berita transfer."
        />
      </CardFooter>
    </Card>
  );
}
