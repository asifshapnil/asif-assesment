import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import PaginationComponent from "../pagination/pagination.component";

import "./table.scss";
import faArrowDown from "../../assets/icon/sort-down.svg";
import faArrowUp from "../../assets/icon/sort-up.svg";
import capitalizeFirst from "../helpers/upper-case";

interface TableHeader {
  label: String;
  title: String;
  width?: string;
  type?: "datetime" | string;
  redirectUrl?: string;
  isSorted?: boolean;
}

export interface EmptyConfig {
  title: string;
  description: string;
}

interface TableComponentProps {
  tableHeaders: TableHeader[] | any;
  allData?: any[];
  data: any[];
  totalNumberOfRecords: number;
  pageSize: number;
  current: number;
  onChangePage: any;
  onChangeSort?: any;
  actionConfig?: any;
  actionConfigName?: string;
  emptyConfig?: EmptyConfig;
  enableSelection?: boolean;
  isLoadingData?: boolean;
  count?: number;
  wrapperHeight?: string;
  moduleName?: any;
  actionName?: any;
}

interface SelectedItem {
  page: any;
  value: any;
}

const TableComponent: FC<TableComponentProps> = ({
  tableHeaders,
  allData = [],
  data,
  totalNumberOfRecords,
  pageSize,
  current,
  onChangePage,
  onChangeSort,
  actionConfig,
  actionConfigName = "Action",
  emptyConfig = null,
  enableSelection = false,
  isLoadingData = false,
  count = 11,
  wrapperHeight = "700px",
  moduleName,
  actionName,
}) => {
  const [hoverList, setHoverList] = useState([] as any);
  const [isDesc, setIsDesc] = useState(true);
  const [sortBy, setSortBy] = useState(null);
  const [disabledStatus, setDisabledStatus] = useState(false);
  const [areAllItemsSelectedOnThisPage, setAreAllItemsSelectedOnThisPage] =
    useState(false);

  const handleMouseEnter = (item: any) => {
    const copyHoverList = [...hoverList];
    if (!copyHoverList.find((x) => x === item)) {
      copyHoverList.push(item);
    }
    setHoverList(copyHoverList);
  };

  const handleMouseLeave = (item: any) => {
    let copyHoverList = [...hoverList];
    if (copyHoverList.find((x) => x === item)) {
      copyHoverList = copyHoverList.filter((x) => x !== item);
    }
    setHoverList(copyHoverList);
  };

  const handleSort = (label: any) => {
    setSortBy(label);
    setIsDesc(!isDesc);
  };

  useEffect(() => {
    const sortOrder = isDesc ? "desc" : "asc";
    onChangeSort(capitalizeFirst(sortBy), sortOrder);
  }, [isDesc]);


  return (
    <>

      {data?.length ? (
        <>
          <Table hover borderless responsive>
            <thead>
              <tr className="text-center">
                {tableHeaders &&
                  tableHeaders?.length > 0 &&
                  tableHeaders.map((item: any, i: any) => (
                    <th
                      key={i}
                      style={
                        item.width
                          ? {
                            minWidth: item.width,
                            fontWeight: "700",
                          }
                          : {
                            minWidth: "12rem",
                            fontWeight: "700",
                          }
                      }
                    >
                      <div
                        className="d-flex justify-content-center align-items-center"
                        onMouseEnter={() => handleMouseEnter(item)}
                        onMouseLeave={() => handleMouseLeave(item)}
                      >
                        {item.title}
                        <div
                          onClick={() => handleSort(item.label)}
                          className={`d-flex ms-2 ${(item.hasOwnProperty("isSorted") &&
                            item.isSorted) ||
                            hoverList.find((x: any) => x === item)
                            ? "activeSort d-flex"
                            : "d-none"
                            }`}
                          style={{ cursor: "pointer" }}
                        >
                          {isDesc ? (
                            <img src={faArrowDown} alt="arrowDown" />
                          ) : (
                            <img src={faArrowUp} alt="arrowUp" />
                          )}
                        </div>
                      </div>
                    </th>
                  ))}

                {actionConfig && <th>{actionConfigName}</th>}
              </tr>
            </thead>

            <tbody>
              {data &&
                data?.length > 0 &&
                data.map((data: any, j: number) => (
                  <tr key={j} className="text-center">
                    {tableHeaders.map((item: any, l: any) => (
                      <td
                        key={l}
                        style={{
                          backgroundColor: "#EBEBEB",
                        }}
                      >
                        <div className="flex justify-center items-center m-2">
                          {item.hasOwnProperty("type") &&
                            item?.type === "datetime" ? (
                            <>
                              {data[item.label] ? (
                                <>
                                  {" "}
                                  {moment
                                    .utc(data[item.label])

                                    .format("DD-MM-YYYY HH:mm:ss")}{" "}
                                  {
                                    "(GMT + 8)" /* always it will be (GMT + 8) as per last discussion */
                                  }
                                  {/* {currentOffset} */}
                                </>
                              ) : (
                                "-"
                              )}
                            </>
                          ) : item?.type === "date" ? (
                            <>
                              {data[item.label] ? (
                                <>
                                  {" "}
                                  {moment(data[item.label]).format(
                                    "DD-MM-YYYY "
                                  )}{" "}
                                </>
                              ) : (
                                "-"
                              )}
                            </>
                          ) : item?.type === "link" ? (
                            <>
                              <div
                                style={{
                                  color: "#0c8188",
                                  cursor: "pointer",
                                }}
                              >
                                {data[item.label]}
                              </div>
                            </>
                          ) : (
                            <>
                              {typeof data[item.label] === "string" &&
                                data[item.label]?.length
                                ? capitalizeFirst(data[item.label])
                                : typeof data[item.label] === "number"
                                  ? data[item.label]
                                  : typeof data[item.label] === "boolean"
                                    ? data[item.label]
                                      ? "True"
                                      : "False"
                                    : "-"}
                            </>
                          )}
                        </div>
                      </td>
                    ))}

                    {actionConfig && actionConfig?.length && (
                      <td
                        className="align-middle"
                        width={"50px"}
                        style={{
                          backgroundColor: "#EBEBEB",
                          fontWeight: "500px",
                        }}
                      >
                        <div className="flex justify-content-center">
                          {actionConfig.map((action: any, k: number) =>
                            <div
                              key={k}
                              className={`table-actions  m-2 ${action.hasOwnProperty("isDisplay")
                                && action.isDisplay(data, action.label) || !action.hasOwnProperty("isDisplay") ? "" : 'disabled'
                                }`}
                              onClick={() =>
                                action.hasOwnProperty("isDisplay")
                                  && action.isDisplay(data, action.label) || !action.hasOwnProperty("isDisplay") ?
                                  action.event(
                                    data[action.actionProperty]
                                  ) : null
                              }
                            >
                              {action.label}
                              <FontAwesomeIcon
                                icon={action.icon}
                                className="fs-7 ms-2"
                              />
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>

          <div className="mt-3 d-flex justify-content-center">
            {onChangePage && totalNumberOfRecords && pageSize && current ? (
              <PaginationComponent
                totalNumberOfRecords={totalNumberOfRecords}
                pageSize={pageSize}
                current={current}
                onChangePage={onChangePage}
              />
            ) : null}
          </div>
        </>
      ) : (
        null
      )}
    </>
  );
};

export default TableComponent;
