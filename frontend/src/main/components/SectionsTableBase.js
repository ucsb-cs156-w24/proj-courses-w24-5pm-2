import React from "react";
import { useTable, _useSortBy, useGroupBy, useExpanded } from 'react-table'
import { Table, _Button } from "react-bootstrap";


// Stryker disable StringLiteral, ArrayDeclaration
export default function SectionsTableBase({ columns, data, testid = "testid"}) {
  
  // Stryker disable next-line ObjectLiteral
  const {getTableProps, getTableBodyProps, headerGroups, rows,prepareRow} = useTable({initialState: {groupBy: []}, columns, data }, useGroupBy, useExpanded)

  return (
    <Table {...getTableProps()} striped bordered hover >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                data-testid={`${testid}-header-${column.id}`}
              >
                {column.canGroupBy ? (
                    <span data-testid={`${testid}-header-${column.id}-expand-boxes`}
                    {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? "🟥 " : "🟩 "}
                    </span>
                ) : null}
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, _index) => {
                return (
                    <td
                    {...cell.getCellProps()}
                    data-testid={`${testid}-cell-row-${cell.row.index}-col-${cell.column.id}`}
                    // Stryker disable next-line ObjectLiteral
                    style={{background: cell.isGrouped ? "#e5fcf4" : cell.isAggregated ? "#e5fcf4" : "white"}}
                  >
                    
                    {cell.isGrouped ? (
                    <>
                    <span {...row.getToggleRowExpandedProps()}
                    data-testid={`${testid}-cell-row-${cell.row.index}-col-${cell.column.id}-expand-symbols`}
                    >
                        {row.isExpanded ? "-" : "+"}
                    </span>{" "}
                    {cell.render("Cell")} 
                    </>
                    ) 
                    : cell.isAggregated ? (
                      cell.render("Aggregated")
                    )
                    : cell.render('Cell')
                    // : cell.isRepeatedValue ? null : (
                    //     cell.render("Cell")
                    // )
                  }
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

// The callback function for ButtonColumn should have the form
// (cell) => { doSomethingWith(cell); }
// The fields in cell are:
//   ["column","row","value","getCellProps","render"]
// Documented here: https://react-table.tanstack.com/docs/api/useTable#cell-properties
// Typically, you want cell.row.values, which is where you can get the individual
//   fields of the object representing the row in the table.
// Example: 
//   const deleteCallback = (cell) => 
//      toast(`Delete Callback called on id: ${cell.row.values.id} name: ${cell.row.values.name}`);

// Add it to table like this:
// const columns = [
//   {
//       Header: 'id',
//       accessor: 'id', // accessor is the "key" in the data
//   },
//   {
//       Header: 'Name',
//       accessor: 'name',
//   },
//   ButtonColumn("Edit", "primary", editCallback),
//   ButtonColumn("Delete", "danger", deleteCallback)
// ];

// export function ButtonColumn(label, variant, callback, testid) {
//   const column = {
//     Header: label,
//     id: label,
//     Cell: ({ cell }) => (
//       <Button
//         variant={variant}
//         onClick={() => callback(cell)}
//         data-testid={`${testid}-cell-row-${cell.row.index}-col-${cell.column.id}-button`}
//       >
//         {label}
//       </Button>
//     )
//   }
//   return column;
// }