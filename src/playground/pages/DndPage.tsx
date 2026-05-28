import { useEffect, useMemo, useState } from 'react';

import { Card, CardBody, CardHeader } from '../../components/card';
import { DndBoard, DndColumn, DndItem } from '../../components/dnd';

import illust from '../assets/images/navigation.png';
import { Text } from '../../components/text';
import { Icon } from '../../components/icons';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useMarkdown } from '../hooks/useMarkdown';

type FormField = {
  id: string;
  ticket_custom_field_id: number | null;
  position: number | null;
  attribute: string;
  attribute_label: string;
};

type FormSection = {
  id: string;
  name: string;
  position: number;
};

type FormFieldsRecord = Record<string, FormField[]>;

type DemoTask = {
  id: string;
  title: string;
  label: string;
};

type FormConfiguration = {
  sections: {
    id: number;
    name: string;
    position: number;
    fields: FormField[];
  }[];

  inactive_fields: FormField[];

  default_sections: {
    id: number;
    name: string;
    position: number;
    fields: FormField[];
  }[];
};

const formConfiguration: FormConfiguration = {
  sections: [
    {
      id: 19,
      name: 'People',
      position: 1,
      fields: [
        {
          id: '74',
          ticket_custom_field_id: null,
          position: 1,
          attribute: 'assigned_to_id',
          attribute_label: 'Assignee',
        },
      ],
    },

    {
      id: 20,
      name: 'Details',
      position: 2,
      fields: [
        {
          id: '75',
          ticket_custom_field_id: null,
          position: 1,
          attribute: 'ticket_type_id',
          attribute_label: 'Type',
        },
        {
          id: '76',
          ticket_custom_field_id: null,
          position: 2,
          attribute: 'ticket_priority_id',
          attribute_label: 'Priority',
        },
        {
          id: '77',
          ticket_custom_field_id: null,
          position: 3,
          attribute: 'work_estimate',
          attribute_label: 'Work Estimate',
        },
      ],
    },

    {
      id: 21,
      name: 'Other',
      position: 3,
      fields: [
        {
          id: '78',
          ticket_custom_field_id: 2,
          position: 1,
          attribute: 'cf_2',
          attribute_label: 'Select One Item (Updated)',
        },
      ],
    },
  ],

  inactive_fields: [
    {
      id: 'cf_1',
      ticket_custom_field_id: 1,
      position: null,
      attribute: 'cf_1',
      attribute_label: 'Test Field',
    },
  ],

  default_sections: [],
};

const basicBoardItems: Record<string, DemoTask[]> = {
  todo: [
    {
      id: 'task-1',
      title: 'Create wireframe',
      label: 'Design',
    },
    {
      id: 'task-2',
      title: 'Prepare copy',
      label: 'Content',
    },
  ],
  progress: [
    {
      id: 'task-3',
      title: 'Build layout',
      label: 'Frontend',
    },
  ],
  done: [
    {
      id: 'task-4',
      title: 'Define component API',
      label: 'System',
    },
  ],
};

const basicBoardCode = `const [items, setItems] = useState({
  todo: [{ id: 'task-1', title: 'Create wireframe' }],
  progress: [{ id: 'task-2', title: 'Build layout' }],
  done: [],
});

<DndBoard items={items} onItemsChange={setItems}>
  {Object.entries(items).map(([columnId, columnItems]) => (
    <DndColumn key={columnId} id={columnId}>
      {columnItems.map((item, index) => (
        <DndItem key={item.id} containerId={columnId} index={index}>
          {item.title}
        </DndItem>
      ))}
    </DndColumn>
  ))}
</DndBoard>`;

const formConfigurationCode = `const [formFields, setFormFields] = useState({
  people: [{ id: '74', attribute_label: 'Assignee' }],
  details: [{ id: '75', attribute_label: 'Type' }],
  inactive_fields: [{ id: 'cf_1', attribute_label: 'Test Field' }],
});

<DndBoard items={formFields} onItemsChange={setFormFields}>
  <DndColumn id="people">
    {formFields.people.map((field, index) => (
      <DndItem key={field.id} containerId="people" index={index}>
        {field.attribute_label}
      </DndItem>
    ))}
  </DndColumn>

  <DndColumn id="inactive_fields">
    {formFields.inactive_fields.map((field, index) => (
      <DndItem key={field.id} containerId="inactive_fields" index={index}>
        {field.attribute_label}
      </DndItem>
    ))}
  </DndColumn>
</DndBoard>`;

export default function DndPage() {
  const { doc } = useMarkdown('/docs/dnd.md');

  const sections: FormSection[] = useMemo(() => {
    return [
      ...formConfiguration.sections.map((section) => ({
        id: String(section.id),
        name: section.name,
        position: section.position,
      })),

      {
        id: 'inactive_fields',
        name: 'Inactive Fields',
        position: 999,
      },
    ];
  }, []);

  const initialFields: FormFieldsRecord = useMemo(() => {
    const result: FormFieldsRecord = {};

    formConfiguration.sections.forEach((section) => {
      result[String(section.id)] = section.fields;
    });

    result.inactive_fields = formConfiguration.inactive_fields;

    return result;
  }, []);

  const [formFields, setFormFields] = useState<FormFieldsRecord>(initialFields);
  const [basicItems, setBasicItems] = useState(basicBoardItems);

  useEffect(() => {
    // console.log('Form fields updated:', formFields);
  }, [formFields]);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Drag and Drop"
        description="Board interaktif untuk mengatur item di dalam kolom atau memindahkan
          item ke kolom lain."
      />

      <MainSection
        title="Basic Board"
        code={basicBoardCode}
        className="mt-4"
        contentClassName="overflow-x-auto"
      >
        <DndBoard
          items={basicItems}
          onItemsChange={setBasicItems}
          className="grid min-w-180 grid-cols-3 gap-4"
        >
          {Object.entries(basicItems).map(([columnId, columnItems]) => (
            <DndColumn
              key={columnId}
              id={columnId}
              className="flex min-h-64 flex-col rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <div className="mb-3 flex items-center justify-between">
                <Text
                  variant="p2"
                  weight="semibold"
                  className="capitalize"
                  value={columnId}
                />
                <Text
                  variant="t2"
                  className="text-gray-600"
                  value={`${columnItems.length} items`}
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                {columnItems.map((item, itemIndex) => (
                  <DndItem
                    key={item.id}
                    containerId={columnId}
                    index={itemIndex}
                    activeClassName="border-dashed bg-primary-50 opacity-40"
                    className="rounded-lg border border-gray-200 bg-white p-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <Icon name="drag-handle" className="text-gray-400" />
                      <div>
                        <Text variant="t1" weight="medium" value={item.title} />
                        <Text
                          variant="t2"
                          className="text-gray-600"
                          value={item.label}
                        />
                      </div>
                    </div>
                  </DndItem>
                ))}

                {columnItems.length === 0 && (
                  <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-600">
                    Drop item here
                  </div>
                )}
              </div>
            </DndColumn>
          ))}
        </DndBoard>
      </MainSection>

      <MainSection
        title="Form Configuration Example"
        code={formConfigurationCode}
        className="mt-4"
      >
        <DndBoard items={formFields} onItemsChange={setFormFields}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              {sections
                .filter((section) => section.id !== 'inactive_fields')
                .map((section) => (
                  <DndColumn key={section.id} id={section.id}>
                    <Card>
                      <CardHeader divider>{section.name}</CardHeader>

                      <CardBody className="flex flex-col gap-2">
                        {formFields[section.id]?.map((field, fieldIndex) => (
                          <DndItem
                            key={field.id}
                            containerId={section.id}
                            index={fieldIndex}
                            activeClassName="border-dashed bg-primary-50 opacity-40"
                          >
                            <div className="flex items-center">
                              <Icon
                                name="drag-handle"
                                className="mr-2 text-gray-400"
                              />

                              <div className="flex-1">
                                <Text variant="t2">
                                  {field.attribute_label}
                                </Text>
                              </div>

                              <Icon name="times" />
                            </div>
                          </DndItem>
                        ))}

                        {formFields[section.id]?.length === 0 && (
                          <Text>Drag and drop data here to add it.</Text>
                        )}
                      </CardBody>
                    </Card>
                  </DndColumn>
                ))}
            </div>

            <div className="sticky top-4 h-fit">
              <DndColumn id="inactive_fields">
                <Card>
                  <CardHeader divider>Inactive Fields</CardHeader>
                  <CardBody className="flex flex-col gap-2">
                    {formFields.inactive_fields?.map((field, fieldIndex) => (
                      <DndItem
                        key={field.id}
                        containerId="inactive_fields"
                        index={fieldIndex}
                        activeClassName="border-dashed bg-primary-50 opacity-40"
                      >
                        <div className="flex items-center">
                          <Icon
                            name="drag-handle"
                            className="mr-2 text-gray-400"
                          />

                          <div className="flex-1">
                            <Text variant="t2">{field.attribute_label}</Text>
                          </div>
                        </div>
                      </DndItem>
                    ))}

                    {formFields.inactive_fields?.length === 0 && (
                      <Text>Drag and drop data here to add it.</Text>
                    )}
                  </CardBody>
                </Card>
              </DndColumn>
            </div>
          </div>
        </DndBoard>
      </MainSection>

      <Card className="mt-4">
        <CardBody>
          <MarkdownRenderer content={doc?.content ?? ''} />
        </CardBody>
      </Card>

      <Footer
        title="Drag and Drop"
        backTo="/timeline"
        backToTitle="Timeline"
        nextTo="/calendar"
        nextToTitle="Calendar"
      />
    </>
  );
}
