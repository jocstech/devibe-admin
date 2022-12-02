import type { ElTable } from 'element-plus'
import Table from './src/Table.vue'
import type { TableSetPropsType } from '@/types/table'

export interface TableExpose {
  setProps: (props: Recordable) => void
  setColumn: (columnProps: TableSetPropsType[]) => void
  selections: Recordable[]
  elTableRef: ComponentRef<typeof ElTable>
}

export { Table }
