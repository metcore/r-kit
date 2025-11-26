import { Bagde } from "./components/bagde";
import { Button } from "./components/button";
import { Card, CardBody, CardHeader } from "./components/card/card";
import { Input } from "./components/input/input";

function App() {
  return (
    <>
      <div className="p-10 gap-4 flex flex-col">
        <div className="flex gap-2 justify-start">
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="danger">Danger</Button>
          <Button color="warning">Warning</Button>
          <Button color="info">Info</Button>
          <Button color="orange">Orange</Button>
          <Button color="purple">Purple</Button>
          <Button color="gray">Gray</Button>
        </div>
        <div className="flex gap-2 justify-start">
          <Button disabled color="primary">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            Primary
          </Button>
          <Button disabled color="secondary">
            Secondary
          </Button>
          <Button disabled color="success">
            Success
          </Button>
          <Button disabled color="danger">
            Danger
          </Button>
          <Button disabled color="warning">
            Warning
          </Button>
          <Button disabled color="info">
            Info
          </Button>
          <Button disabled color="orange">
            Orange
          </Button>
          <Button disabled color="purple">
            Purple
          </Button>
          <Button disabled color="gray">
            Gray
          </Button>
        </div>
        <div className="flex gap-2 justify-start">
          <Button variant={"outline"} color="primary">
            Primary
          </Button>
          <Button variant={"outline"} color="secondary">
            Secondary
          </Button>
          <Button variant={"outline"} color="success">
            Success
          </Button>
          <Button variant={"outline"} color="danger">
            Danger
          </Button>
          <Button variant={"outline"} color="warning">
            Warning
          </Button>
          <Button variant={"outline"} color="info">
            Info
          </Button>
          <Button variant={"outline"} color="orange">
            Orange
          </Button>
          <Button variant={"outline"} color="purple">
            Purple
          </Button>
          <Button variant={"outline"} color="gray">
            Gray
          </Button>
        </div>

        <div className="flex gap-2 justify-start">
          <Button variant={"tertiary"} color="primary">
            Primary
          </Button>
          <Button variant={"tertiary"} color="secondary">
            Secondary
          </Button>
          <Button variant={"tertiary"} color="success">
            Success
          </Button>
          <Button variant={"tertiary"} color="danger">
            Danger
          </Button>
          <Button variant={"tertiary"} color="warning">
            Warning
          </Button>
          <Button variant={"tertiary"} color="info">
            Info
          </Button>
          <Button variant={"tertiary"} color="orange">
            Orange
          </Button>
          <Button variant={"tertiary"} color="purple">
            Purple
          </Button>
          <Button variant={"tertiary"} color="gray">
            Gray
          </Button>
        </div>
        <div>
          <h2>size md</h2>
          <div className="flex gap-2 justify-start">
            <Button size={"md"} color="primary">
              Primary
            </Button>
            <Button size={"md"} color="secondary">
              Secondary
            </Button>
            <Button size={"md"} color="success">
              Success
            </Button>
            <Button size={"md"} color="danger">
              Danger
            </Button>
            <Button size={"md"} color="warning">
              Warning
            </Button>
            <Button size={"md"} color="info">
              Info
            </Button>
            <Button size={"md"} color="orange">
              Orange
            </Button>
            <Button size={"md"} color="purple">
              Purple
            </Button>
            <Button size={"md"} color="gray">
              Gray
            </Button>
          </div>
        </div>

        <div>
          <h2>size lg</h2>
          <div className="flex gap-2 justify-start">
            <Button size={"lg"} color="primary">
              Primary
            </Button>
            <Button size={"lg"} color="secondary">
              Secondary
            </Button>
            <Button size={"lg"} color="success">
              Success
            </Button>
            <Button size={"lg"} color="danger">
              Danger
            </Button>
            <Button size={"lg"} color="warning">
              Warning
            </Button>
            <Button size={"lg"} color="info">
              Info
            </Button>
            <Button size={"lg"} color="orange">
              Orange
            </Button>
            <Button size={"lg"} color="purple">
              Purple
            </Button>
            <Button size={"lg"} color="gray">
              Gray
            </Button>
          </div>
        </div>
      </div>

      <div className="p-10 gap-4 flex flex-col">
        <div className="flex gap-2 justify-start">
          <Input
            id="input-id"
            label="label"
            placeholder="placeholder"
            rightAddon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            }
          />
        </div>
        <div className="flex flex-col gap-2 justify-start">
          <Input size={"sm"} label="label" placeholder="placeholder" />
          <Input
            label="label"
            placeholder="placeholder"
            hint="Ini adalah sebuah hint"
            errorMessages={"error message"}
          />
          <Input
            label="Password"
            size={"lg"}
            errorMessages={[
              "Password minimal 8 karakter.",
              "Password harus mengandung angka.",
            ]}
          />
          <Input disabled label="label" placeholder="placeholder" />
          <Input
            type="text"
            label="Username"
            id="username"
            errorMessages={"ada error"}
            placeholder="placeholder"
            leftAddon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            }
            rightAddon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            }
          />
          <Input
            label="label"
            placeholder="placeholder"
            leftAddon={
              <div className="flex items-center gap-1">
                <select onChange={(e) => console.log(e.target.value)}>
                  <option value="">All</option>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="idr">IDR</option>
                </select>
              </div>
            }
          />
        </div>

        <Button className="w-fit" size={"md"}>
          Submit
        </Button>
      </div>

      <div className="p-10 gap-4 flex flex-col">
        <div className="flex gap-2 justify-start">
          <Bagde color="primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                clipRule="evenodd"
              />
            </svg>
          </Bagde>
          <Bagde color="secondary">Secondary</Bagde>
          <Bagde color="success">Success</Bagde>
          <Bagde color="danger">Danger</Bagde>
          <Bagde color="warning">Warning</Bagde>
          <Bagde color="info">Info</Bagde>
          <Bagde color="orange">Orange</Bagde>
          <Bagde color="purple">Purple</Bagde>
          <Bagde color="gray">Gray</Bagde>
        </div>

        <div className="flex gap-2 justify-start">
          <Bagde size={"sm"} color="primary">
            Primary
          </Bagde>
          <Bagde size={"sm"} color="secondary">
            Secondary
          </Bagde>
          <Bagde size={"sm"} color="success">
            Success
          </Bagde>
          <Bagde size={"sm"} color="danger">
            Danger
          </Bagde>
          <Bagde size={"sm"} color="warning">
            Warning
          </Bagde>
          <Bagde size={"sm"} color="info">
            Info
          </Bagde>
          <Bagde size={"sm"} color="orange">
            Orange
          </Bagde>
          <Bagde size={"sm"} color="purple">
            Purple
          </Bagde>
          <Bagde size={"sm"} color="gray">
            Gray
          </Bagde>
        </div>

        <div className="flex gap-2 justify-start">
          <Bagde size={"lg"} color="primary">
            Primary
          </Bagde>
          <Bagde size={"lg"} color="secondary">
            Secondary
          </Bagde>
          <Bagde size={"lg"} color="success">
            Success
          </Bagde>
          <Bagde size={"lg"} color="danger">
            Danger
          </Bagde>
          <Bagde size={"lg"} color="warning">
            Warning
          </Bagde>
          <Bagde size={"lg"} color="info">
            Info
          </Bagde>
          <Bagde size={"lg"} color="orange">
            Orange
          </Bagde>
          <Bagde size={"lg"} color="purple">
            Purple
          </Bagde>
          <Bagde size={"lg"} color="gray">
            Gray
          </Bagde>
        </div>
      </div>

      <div className="p-10 gap-4 flex flex-col">
        <div className="grid grid-cols-4 gap-4">
          <Card size="lg">
            <CardHeader divider>Header</CardHeader>
            <CardBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus quis at neque esse aperiam, ipsam quo sequi nam
              repudiandae est deleniti culpa. Tenetur quaerat cumque id maxime!
              Dolores, tenetur consectetur.
            </CardBody>
          </Card>
          <Card variant={"filled"} color="primary" size="lg">
            <CardHeader divider>Header</CardHeader>
            <CardBody>Konten card</CardBody>
          </Card>
          <Card color="danger" size="md">
            <CardHeader divider>Header</CardHeader>
            <CardBody>Konten card</CardBody>
          </Card>
          <div>
            <Card variant={"filled"} color="primary" size="md">
              <CardBody>
                <p>Halo dunis</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Magni quam esse labore corporis autem recusandae quod, itaque
                  non sunt dolores incidunt iure, dignissimos illo ipsum odio
                  deleniti numquam omnis voluptatem.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
