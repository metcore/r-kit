import dedent from 'dedent';

export const codeExampleSelectBasic = dedent(`
  import { useState } from 'react';
  import type {
    SelectGroup,
    SelectOption,
  }  from '@herca/r-kit/clients';

  const data: SelectOption<{ description?: string }>[] = [
    {
      value: '1',
      label: 'Jhon',
    },
    {
      value: '1',
      label: 'Jhon',
    },
  ];

  export default function SelectPage() {
    const [selectedUser, setSelectedUser] =
      useState<SelectOption<ExtraUser> | null>(null);
    
    <Select
      options={data}
      value={selectedUser}
      onChange={(v) =>
        setSelectedUser(v as SelectOption<ExtraUser> | null)
      }
      placeholder="Cari & pilih user…"
    />
  }
`);

export const codeExampleSelectTooltip = dedent(`
  import { useState } from 'react';
  import type {
    SelectGroup,
    SelectOption,
  }  from '@herca/r-kit/clients';

  const data: SelectOption<{ description?: string }>[] = [
    {
      value: '1',
      label: 'Jhon',
    },
    {
      value: '1',
      label: 'Jhon',
    },
  ];

  export default function SelectPage() {
    const [selectedUser, setSelectedUser] =
      useState<SelectOption<ExtraUser> | null>(null);
    
    <Select
      options={data}
      value={selectedUser}
      tooltip="This is a tooltip"
      label="User"
      onChange={(v) =>
        setSelectedUser(v as SelectOption<ExtraUser> | null)
      }
      placeholder="Cari & pilih user…"
    />
  }
`);

export const codeExampleSelectDescription = dedent(`
  import { useState } from 'react';
  import type {
    SelectGroup,
    SelectOption,
  }  from '@herca/r-kit/clients';

  const data: SelectOption<{ description?: string }>[] = [
    {
        value: '1',
        label: 'Jhon',
        description: 'Jhonson creatable',
    },
    {
        value: '3',
        label: 'Grock',
        description: 'Grock creatable',
    },
  ];

  export default function SelectPage() {
    const [selectedUser, setSelectedUser] =
      useState<SelectOption<ExtraUser> | null>(null);
    
    <Select
      options={data}
      value={selectedUser}
      label="User"
      onChange={(v) =>
        setSelectedUser(v as SelectOption<ExtraUser> | null)
      }
      placeholder="Cari & pilih user…"
    />
  }
`);

export const codeExampleSelectDisabled = dedent(`
  
  import { useState } from 'react';
  import type {
    SelectGroup,
    SelectOption,
  }  from '@herca/r-kit/clients';

  const data: SelectOption<{ description?: string }>[] = [
    {
      value: '1',
      label: 'Jhon',
    },
    {
      value: '1',
      label: 'Jhon',
    },
  ];

  export default function SelectPage() {
    const [selectedUser, setSelectedUser] =
      useState<SelectOption<ExtraUser> | null>(null);
    
    <Select
      options={data}
      value={selectedUser}
      disabled
      onChange={(v) =>
        setSelectedUser(v as SelectOption<ExtraUser> | null)
      }
      placeholder="Cari & pilih user…"
    />
  }
`);

export const codeExampleSelectGroup = dedent(`
  
  import { useState } from 'react';
  import type {
    SelectGroup,
    SelectOption,
  }  from '@herca/r-kit/clients';

  const dataGroup: (SelectOption | SelectGroup)[] = [
    {
      label: 'Jakarta',
      options: [
        { label: 'Jack', value: 'Jack' },
        { label: 'lucy', value: 'Lucy' },
      ],
    },
    {
      label: 'Bandung',
      options: [
        { label: 'Jack', value: 'Jack' },
        { label: 'lucy', value: 'Lucy' },
      ],
    },
    { label: 'Bandung', value: 'bdg' },
  ];

  export default function SelectPage() {
    const [selectedUser, setSelectedUser] =
      useState<SelectOption<ExtraUser> | null>(null);
    
    <Select
      options={data}
      value={selectedUser}
      disabled
      onChange={(v) =>
        setSelectedUser(v as SelectOption<ExtraUser> | null)
      }
      placeholder="Cari & pilih user…"
    />
  }
`);

export const codeExampleSelectCreatable = dedent(`
  
  import { useState } from 'react';
  import type {
    SelectGroup,
    SelectOption,
  }  from '@herca/r-kit/clients';

  const dataGroup: (SelectOption | SelectGroup)[] = [
    {
      label: 'Jakarta',
      options: [
        { label: 'Jack', value: 'Jack' },
        { label: 'lucy', value: 'Lucy' },
      ],
    },
    {
      label: 'Bandung',
      options: [
        { label: 'Jack', value: 'Jack' },
        { label: 'lucy', value: 'Lucy' },
      ],
    },
    { label: 'Bandung', value: 'bdg' },
  ];

  export default function SelectPage() {
    const [selectedUser, setSelectedUser] =
      useState<SelectOption<ExtraUser> | null>(null);
    
    const handleOnCreate = async (val: SelectOnCreateValue) => {
      setLoadingOnCreate(true);
      try {
        const response = await fetch('https://dummyjson.com/users/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: val,
            lastName: val,
          }),
        });
        const json = await response.json();
  
        setSelectedUsers(
          (prev) =>
            [
              ...prev,
              {
                value: json.id,
                label: json.firstName,
              },
            ] as SelectOption[]
        );
  
        toast.show({
          title: 'Success!',
          description: 'User berhasil dibuat!',
          color: 'success',
        });
        setLoadingOnCreate(false);
      } catch {
        setLoadingOnCreate(false);
      }
    };
    return (
      <Select
        options={data}
        value={selectedUser}
        creatable={true}
        onCreate={handleOnCreate}
        disabled
        onChange={(v) =>
          setSelectedUser(v as SelectOption<ExtraUser> | null)
        }
        placeholder="Cari & pilih user…"
      />
    )
  }
`);

export const codeExampleSelectMultiple = dedent(`
  
  import { useState } from 'react';
  import type {
    SelectGroup,
    SelectOption,
  }  from '@herca/r-kit/clients';

  const data: SelectOption<{ description?: string }>[] = [
    {
      value: '1',
      label: 'Jhon',
    },
    {
      value: '2',
      label: 'Grock',
    },
    {
      value: '3',
      label: 'Lorem',
    },
    {
      value: '4',
      label: 'Premis',
    },
  ];
  export default function SelectPage() {
    const [selectedUser, setSelectedUser] =
      useState<SelectOption<ExtraUser> | null>(null);
    
    <Select
      label="Team members"
      options={data}
      value={selectedUserMultiple}
      onChange={(v) => {
        setSelectedUserMultiple(v as SelectOption[]);
      }}
      multiple
    />
  }
`);

export const codeExampleAsyncSelecBasic = dedent(`
  import { useState } from 'react';

  import type {
    AsyncSelect,
    SelectOption,
  } from '@herca/r-kit/clients';

  type ExtraUser = {
    email: string;
    age: number;
    image: string;
  };

  export default function SelectPage() {
    const [selectedUser, setSelectedUser] =
      useState<SelectOption<ExtraUser> | null>(null);

    const handleOnChange = (
      value: SelectOption<ExtraUser> | null
    ) => {
      setSelectedUser(value);
    };

    return (
      <AsyncSelect<ExtraUser>
        placeholder="Cari user..."
        debounceMs={500}
        loadOptions={async ({ search, page }) => {
          const limit = 30;
          const skip = page * limit;

          const response = await fetch(
            \`https://dummyjson.com/users/search?q=\${search}&limit=\${limit}&skip=\${skip}\`
          );

          const json = await response.json();

          return {
            options: json.users.map((user: any) => ({
              label: \`\${user.firstName} \${user.lastName}\`,
              value: String(user.id),
              extra: {
                email: user.email,
                age: user.age,
                image: user.image,
              },
            })),

            hasMore:
              skip + json.users.length < json.total,
          };
        }}
        value={selectedUser}
        onChange={handleOnChange}
      />
    );
  }
`);
