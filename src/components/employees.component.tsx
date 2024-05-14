import axios from "axios";
import { createRef, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees, setEmployees } from "../store/employees.slice";
import capitalizeFirst from "../shared/helpers/upper-case";
import TableComponent from "../shared/table/table.component";
import TableSort from "../shared/helpers/table-sort";
import FilterFormComponent, { FilterFormConfig } from "../shared/filter-form/filter-form.component";

const Employees = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state: any) => state.employees.employees);

    const formRef = createRef();

    const [tempData, setTempData] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [datChangeCount, setDataChangeCount] = useState(0);
    const [filterUpdateCount, setFilterUpdateCount] = useState(0);
    const [filterInitialValues, setFilterInitialValues] = useState({
        employee_name: '',
        employee_age: '',
        employee_salary: ''
    });

    const [columns, setColumns] = useState([
        {
            title: "Name",
            label: "employee_name",
            isSorted: true,
        },
        {
            title: "Age",
            label: "employee_age",
        },
        {
            title: "Salary",
            label: "employee_salary",
        },
    ]);

    const [sortBy, setSortBy] = useState<any>(capitalizeFirst("id"));
    const [sortDirection, setSortDirection] = useState<any>("desc");

    const paginate = (array: [], page_size: any, page_number: any) => {
        const data = array.slice(
            (page_number - 1) * page_size,
            page_number * page_size
        );
        return data;
    };

    useEffect(() => {
        const tempData = paginate(employees, pageSize, page);
        setTempData(tempData);
    }, [page]);

    useEffect(() => {
        const tempData = paginate(employees, pageSize, page);
        setTempData(tempData);
    }, [datChangeCount, employees]);

    useEffect(() => {
        const sortByItem = sortBy.toLowerCase();
        const sortedData = [...employees].sort((a, b) => {
            // Get the values to compare
            let itemA = a[sortByItem];
            let itemB = b[sortByItem];

            try {
                // Try using localeCompare for strings
                itemA = itemA.toLowerCase();
                itemB = itemB.toLowerCase();

                if (sortDirection === 'asc') {
                    return itemA.localeCompare(itemB);
                } else {
                    return itemB.localeCompare(itemA);
                }
            } catch (error) {
                // If localeCompare fails, handle the comparison differently (e.g., for numbers)
                if (sortDirection === 'asc') {
                    return itemA - itemB;
                } else {
                    return itemB - itemA;
                }
            }
        });
        dispatch(setEmployees(sortedData));
        setDataChangeCount(datChangeCount + 1);
    }, [sortBy, sortDirection]);

    const onChangePage = (page: number) => {
        setPage(page);
    };

    const onChangeSort = useCallback(
        async (sortBy: string, sortDirection: any) => {
            if (!sortBy || !sortDirection) return;

            setSortBy(sortBy);
            setSortDirection(sortDirection);

            const copyColumns: any = await TableSort(
                columns,
                sortBy
            );
            setColumns(copyColumns);
        },
        []
    );

    const filterFormConfig: FilterFormConfig = {
        controls: [
            {
                controlGroup: [
                    {
                        name: "employee_name",
                        placeholder: "Filter by name",
                        type: "text",
                        required: true,
                    },
                ],
            },
            {
                controlGroup: [
                    {
                        name: "employee_age",
                        placeholder: "Filter by age",
                        type: "number",
                        required: true,
                    },
                ],
            },
            {
                controlGroup: [
                    {
                        name: "employee_salary",
                        placeholder: "Filter by salary",
                        type: "number",
                        required: true,
                    },
                ],
            }
        ],
    };

    const filterData = (data: any, filters: any) => {
        return data.filter((employee: any) => {
            debugger
            const nameFilter = filters.employee_age.length && employee.employee_name.toLowerCase().includes(filters.employee_name.toLowerCase());
            const ageFilter = filters.employee_age && employee.employee_age === filters.employee_age;
            const salaryFilter = filters.employee_salary && employee.employee_salary === filters.employee_salary;
            return nameFilter || salaryFilter || ageFilter || (nameFilter && ageFilter) || (nameFilter && salaryFilter) || (ageFilter && salaryFilter) || (nameFilter && ageFilter && salaryFilter);
        });
    }

    useEffect(() => {
        setFilterUpdateCount(filterUpdateCount + 1);
    }, [filterInitialValues])

    const onSubmitFilter = () => {
        const form: any = formRef.current;
        if (form) {
            const filters = form.values;
            const filteredData = filterData(employees, filters);
            setTempData(filteredData);
            setPage(1);
        }
    }

    const onReset = () => {
        const tempData = paginate(employees, pageSize, page);
        setTempData(tempData);

        setFilterInitialValues({
            employee_name: '',
            employee_age: '',
            employee_salary: ''
        });
    }

    const filterActionConfig: any = {
        label: "Filter",
        event: onSubmitFilter,
    };

    const reset: any = {
        label: "Reset",
        event: onReset,
        variant: "default",
    };

    const getEmployeesData = () => {
        dispatch(getEmployees())
    }

    useEffect(() => {
        getEmployeesData();
    }, []);

    useEffect(() => {
        console.log(employees);
    }, [employees])

    return (
        <div>
            <div>
                <FilterFormComponent
                    formRef={formRef}
                    initialValues={filterInitialValues}
                    formConfig={filterFormConfig}
                    actionConfig={filterActionConfig}
                    resetButton={reset}
                    filterUpdateAction={filterUpdateCount}
                />
            </div>
            <TableComponent
                tableHeaders={columns}
                data={tempData}
                totalNumberOfRecords={employees?.length}
                pageSize={pageSize}
                current={page}
                onChangePage={onChangePage}
                onChangeSort={onChangeSort}
            />
        </div>
    )
}

export default Employees;