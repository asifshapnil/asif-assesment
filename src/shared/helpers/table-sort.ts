const TableSort = (columns: any, sortBy: any) => {
    return new Promise((resolve) => {
        const copyColumns: any = [...columns];
        const tempColumn = copyColumns.find((x: any) => x.isSorted) ;
        tempColumn.isSorted = false;
        const targetColumn: any = copyColumns.find((x: any) => x.label.toLowerCase() === sortBy.toLowerCase());

        if(targetColumn) {
          targetColumn['isSorted'] = true;
        }
        return resolve(columns);
    });
}

export default TableSort;