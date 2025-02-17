import { FormGrid as FormilyGird } from '@cps'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  DnFC,
  useTreeNode,
  useNodeIdProps,
  DroppableWidget,
} from '@pg/prototypes'
import { LoadTemplate } from '../../common/LoadTemplate'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import './styles.less'

import { composeExport } from '@cps/__builtins__'
import { defineComponent } from 'vue'

type formilyGrid = typeof FormilyGird

export const FormGrid = composeExport(
  defineComponent({
    inheritAttrs: false,
    setup(props, { slots, attrs }) {
      const nodeRef = useTreeNode()
      const nodeIdRef = useNodeIdProps()

      return () => {
        const node = nodeRef.value
        if (!node) return
        if (node.children.length === 0)
          return <DroppableWidget {...attrs} />
        // const totalColumns = node.children.reduce(
        //   (buf, child) =>
        //     buf + (child.props?.['x-component-props']?.gridSpan ?? 1),
        //   0
        // )
        return (
          <div class="dn-grid" {...nodeIdRef.value}>
            <FormilyGird {...attrs}>
              {slots.default?.()}
            </FormilyGird>
            <LoadTemplate
              actions={[
                {
                  title: node.getMessage('addGridColumn'),
                  icon: 'AddColumn',
                  onClick: () => {
                    const column = new TreeNode({
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'FormGrid.GridColumn',
                      },
                    })
                    node.append(column)
                  },
                },
              ]}
            />
          </div>
        )
      }
    },
  }),
  {
    GridColumn: defineComponent({
      props: { gridSpan: { default: 1 } },
      setup(props, { attrs, slots }) {
        return () => {
          return (
            <DroppableWidget
              {...attrs}
              data-grid-span={props.gridSpan}
              // style={{
              //   gridColumnStart: `span ${props.gridSpan || 1}`,
              // }}
            >
              {slots.default?.()}
            </DroppableWidget>
          )
        }
      },
    }),
    Behavior: createBehavior(
      {
        name: 'FormGrid',
        extends: ['Field'],
        selector: (node) => node.props?.['x-component'] === 'FormGrid',
        designerProps: {
          droppable: true,
          allowDrop: (node) => node.props?.['x-component'] !== 'FormGrid',
          propsSchema: createFieldSchema(AllSchemas.FormGrid),
        },
        designerLocales: AllLocales.FormGrid,
      },
      {
        name: 'FormGrid.GridColumn',
        extends: ['Field'],
        selector: (node) => node.props?.['x-component'] === 'FormGrid.GridColumn',
        designerProps: {
          droppable: true,
          allowDrop: (node) => node.props?.['x-component'] === 'FormGrid',
          propsSchema: createFieldSchema(AllSchemas.FormGrid.GridColumn),
        },
        designerLocales: AllLocales.FormGridColumn,
      }
    ),
    Resource: createResource({
      icon: 'GridSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid',
          },
          children: [
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
              },
            },
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
              },
            },
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
              },
            },
          ],
        },
      ],
    }),
  }
)
