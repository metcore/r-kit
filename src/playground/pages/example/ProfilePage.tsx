import { Avatar } from '../../../components/avatar';
import {
  Card,
  CardBody,
  CardHeader,
  CardMedia,
} from '../../../components/card';
import { Divider } from '../../../components/devider/devider';
import { Text } from '../../../components/text';
import frame from '../../../assets/images/example/frame-profile.svg';
import {
  Button,
  ButtonIcon,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../clients';
import { Icon } from '../../../components/icons';
import { Badge } from '../../../components/badge';

function ProfilePage() {
  return (
    <Card>
      <CardHeader divider> Profile</CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4">
          <Card>
            <CardMedia image={frame} />
            <CardBody>
              <div className="mb-8 flex gap-2">
                <Avatar name="Organ isad" size="lg" className="-mt-8" />
                <div className="flex flex-1 items-start justify-between">
                  <div className="-mt-6">
                    <Text
                      variant="p2"
                      weight="semibold"
                      className="text-gray-900"
                    >
                      Maman Alkatiri
                    </Text>
                    <Text
                      variant="t1"
                      weight="regular"
                      className="text-gray-700"
                    >
                      @Maman Alkatiri
                    </Text>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="lock" />
                      Change Password
                    </Button>
                    <Dropdown>
                      <DropdownTrigger>
                        <ButtonIcon
                          icon="dot-number"
                          variant="outline"
                          size="sm"
                        />
                      </DropdownTrigger>
                      <DropdownContent>
                        <DropdownItem> Action</DropdownItem>
                        <DropdownItem>
                          <div className="flex flex-wrap items-center gap-2">
                            <Icon name="user" />
                            Another Action
                          </div>
                        </DropdownItem>
                        <DropdownItem> Something ELse Here</DropdownItem>
                        <DropdownItem> Separted Link </DropdownItem>
                      </DropdownContent>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="gap mt-4 grid grid-cols-3">
                <div className="flex items-center gap-2">
                  <Icon name="briefcase-fill" className="text-gray-800" />
                  <div className="flex flex-col">
                    <Text
                      variant="t2"
                      weight="regular"
                      className="text-gray-700"
                    >
                      Division
                    </Text>
                    <Text
                      variant="t2"
                      weight="semibold"
                      className="text-gray-900"
                    >
                      Finance
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="user-briefcase" className="text-gray-800" />
                  <div className="flex flex-col">
                    <Text
                      variant="t2"
                      weight="regular"
                      className="text-gray-700"
                    >
                      Head of Division
                    </Text>
                    <Badge color="success">Yes</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="user-briefcase" className="text-gray-800" />
                  <div className="flex flex-col">
                    <Text
                      variant="t2"
                      weight="regular"
                      className="text-gray-700"
                    >
                      Approver
                    </Text>
                    <Text
                      variant="t2"
                      weight="semibold"
                      className="text-gray-900"
                    >
                      Yudis Anwar
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="envelope" className="text-gray-800" />
                  <div className="flex flex-col">
                    <Text
                      variant="t2"
                      weight="regular"
                      className="text-gray-700"
                    >
                      Email
                    </Text>
                    <div className="flex gap-2">
                      <Text
                        variant="t2"
                        weight="semibold"
                        className="text-gray-900"
                      >
                        metcore2@gmail.com
                      </Text>
                      <Badge color="success" size="sm">
                        <Icon name="check" size={15} />
                        verified
                      </Badge>

                      <Button variant="tertiary" size="xxs" color="info">
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="phone" className="text-gray-800" />
                  <div className="flex flex-col">
                    <Text
                      variant="t2"
                      weight="regular"
                      className="text-gray-700"
                    >
                      Phone Number
                    </Text>
                    <div className="flex gap-2">
                      <Text
                        variant="t2"
                        weight="semibold"
                        className="text-gray-900"
                      >
                        +6289604038338
                      </Text>
                      <Badge color="danger" size="sm">
                        <Icon name="times" size={15} />
                        Not Verified
                      </Badge>

                      <Button variant="tertiary" size="xxs" color="info">
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="envelope" className="text-gray-800" />
                  <div className="flex flex-col">
                    <Text
                      variant="t2"
                      weight="regular"
                      className="text-gray-700"
                    >
                      Customer Blacklist
                    </Text>
                    <div className="flex gap-2">
                      <Badge color="success" size="sm">
                        <Icon name="check" size={15} />
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Tabs id="profile">
            <TabsList>
              <TabsList>
                <TabsTrigger value="Access"> Permisison Akses</TabsTrigger>
                <TabsTrigger value="password"> Access Brand</TabsTrigger>
                <TabsTrigger value="settings"> Access Product</TabsTrigger>
                <TabsTrigger value="disabled"> Access Warehouse</TabsTrigger>
              </TabsList>
            </TabsList>
            <TabsContent value="Access">
              <Card>
                <CardHeader divider>
                  <Text
                    variant="p2"
                    weight="semibold"
                    className="text-gray-900"
                  >
                    Permission Access
                  </Text>
                </CardHeader>
                <CardBody>
                  <Table
                    variant="wrapped-row-bordered"
                    className="w-full table-auto"
                  >
                    <TableHead>
                      <TableRow isHeader>
                        <TableCellHead value="Access" />
                        <TableCellHead
                          value={'View'}
                          onClick={() => console.log('ok')}
                        />
                        <TableCellHead value={'Create'} />
                        <TableCellHead value={'Edit'} />
                        <TableCellHead value={'Delete'} />
                        <TableCellHead value={'Export'} />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell value="View" width="500" />
                        <TableCell value="2" />
                        <TableCell value="x" />
                        <TableCell value="c" />
                        <TableCell value="a" />
                        <TableCell value="b" />
                      </TableRow>
                    </TableBody>
                    {/* <TableFooter colSpan={6}>
                      <TablePagination
                        currentPage={page}
                        totalPage={lastPage}
                        onChangePerpage={(val) => {
                          setPerPage(val);
                          setPage(1); // reset ke page 1
                        }}
                        selectedPerpage={perPage}
                        numberOnClick={(p) => setPage(p)}
                        prevOnClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        nextOnClick={() =>
                          setPage((prev) => Math.min(prev + 1, lastPage))
                        }
                      />
                    </TableFooter> */}
                  </Table>
                </CardBody>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
}

export default ProfilePage;
