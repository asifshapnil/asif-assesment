import { ErrorMessage, Formik } from "formik";
import { FC, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "./filter-form.scss";

export interface Control {
  name: string;
  label?: string;
  placeholder: string;
  type:
  | string
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "date"
  | "datetime"
  | "email"
  | "select"
  | "typeahead"
  | "password";
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  options?: { value: any; label: any }[];
  onChange?: (selectedValue: any) => void;
  onInputChange?: (selectedValue: any) => void;
  maxDate?: string;
  isLoading?: boolean;
  hideVisibility?: boolean;
  selectOptions?: string[];
  selectType?: string | "single" | "multiple";
}

export interface ControlGroup {
  controlGroup: Control[];
}

export interface FilterFormConfig {
  controls: ControlGroup[];
}

interface FilterFormComponentProps {
  formRef: any;
  formConfig: FilterFormConfig;
  initialValues: any;
  actionConfig: any;
  resetButton?: any;
  validation?: any;
  filterUpdateAction?: any;
}

const FilterFormComponent: FC<FilterFormComponentProps> = ({
  formRef,
  formConfig,
  initialValues,
  actionConfig,
  resetButton,
  validation,
  filterUpdateAction
}) => {
  const { controls } = formConfig;
  const [selections, setSelections] = useState<any>([]);
  const typeaheadRef = useRef<any>(null);

  return (
    <div className="filter-form flex flex-col items-end mb-3">
      {Object.keys(initialValues).length ? (
        <div className="w-100">
          <Formik
            key={filterUpdateAction}
            innerRef={formRef}
            enableReinitialize={true}
            onSubmit={() => { }}
            validationSchema={validation}
            initialValues={initialValues}
          >
            {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }: any) => (
              <Form noValidate onSubmit={handleSubmit}>
                <div className="filter-grid">
                  {controls && controls.length
                    ? controls.map((c, i) => (
                      <div key={i} className="d-flex w-100">
                        {c.controlGroup.map((control) => (
                          <>
                            {(() => {
                              switch (control.type) {
                                case "text":
                                  return (
                                    <div className="flex items-start w-100">
                                      <div className="w-100">
                                        <div className="filter-label">
                                          {control.label}
                                        </div>
                                        <Form.Group controlId="validationFormik01">
                                          <Form.Control
                                            type="text"
                                            placeholder={control.placeholder}
                                            name={control.name}
                                            onChange={handleChange}
                                            value={values[control?.name]}
                                            required={
                                              control.required ?? false
                                            }
                                            readOnly={
                                              control.readOnly ?? false
                                            }
                                            disabled={
                                              control.disabled ?? false
                                            }
                                            isValid={
                                              touched[control.name] &&
                                              !errors[control.name]
                                            }
                                            isInvalid={
                                              (!!touched[control.name] &&
                                                !!errors[control.name]) ??
                                              false
                                            }
                                          />
                                          <ErrorMessage
                                            name={control.name}
                                            component="div"
                                            className="error-message"
                                          />
                                        </Form.Group>
                                      </div>
                                    </div>
                                  );
                                case "email":
                                  return (
                                    <div className="flex items-start  w-100">
                                      <div className="w-100">
                                        <div className="filter-label">
                                          {control.label}
                                        </div>
                                        <Form.Group controlId="validationFormik01">
                                          <Form.Control
                                            type="email"
                                            placeholder={control.placeholder}
                                            name={control.name}
                                            onChange={handleChange}
                                            value={values[control?.name]}
                                            required={
                                              control.required ?? false
                                            }
                                            readOnly={
                                              control.readOnly ?? false
                                            }
                                            disabled={
                                              control.disabled ?? false
                                            }
                                            isValid={
                                              touched[control.name] &&
                                              !errors[control.name]
                                            }
                                            isInvalid={
                                              (!!touched[control.name] &&
                                                !!errors[control.name]) ??
                                              false
                                            }
                                          />
                                          <ErrorMessage
                                            name={control.name}
                                            component="div"
                                            className="error-message"
                                          />
                                        </Form.Group>
                                      </div>
                                    </div>
                                  );
                                case "password":
                                  return (
                                    <div className="flex items-start  w-100">
                                      <div className="w-100">
                                        <div className="filter-label">
                                          {control.label}
                                        </div>
                                        <Form.Group controlId="validationFormik01">
                                          <Form.Control
                                            type="password"
                                            placeholder={control.placeholder}
                                            name={control.name}
                                            onChange={handleChange}
                                            value={values[control?.name]}
                                            required={
                                              control.required ?? false
                                            }
                                            readOnly={
                                              control.readOnly ?? false
                                            }
                                            disabled={
                                              control.disabled ?? false
                                            }
                                            isValid={
                                              touched[control.name] &&
                                              !errors[control.name]
                                            }
                                            isInvalid={
                                              (!!touched[control.name] &&
                                                !!errors[control.name]) ??
                                              false
                                            }
                                          />
                                          <ErrorMessage
                                            name={control.name}
                                            component="div"
                                            className="error-message"
                                          />
                                        </Form.Group>
                                      </div>
                                    </div>
                                  );
                                case "number":
                                  return (
                                    <div className="flex items-start  w-100">
                                      <div className="w-100">
                                        <div className="filter-label">
                                          {control.label}
                                        </div>
                                        <Form.Group controlId="validationFormik01">
                                          <Form.Control
                                            type="number"
                                            placeholder={control.placeholder}
                                            name={control.name}
                                            onChange={handleChange}
                                            value={values[control?.name]}
                                            required={
                                              control.required ?? false
                                            }
                                            readOnly={
                                              control.readOnly ?? false
                                            }
                                            disabled={
                                              control.disabled ?? false
                                            }
                                            isValid={
                                              touched[control.name] &&
                                              !errors[control.name]
                                            }
                                            isInvalid={
                                              (!!touched[control.name] &&
                                                !!errors[control.name]) ??
                                              false
                                            }
                                          />
                                          <ErrorMessage
                                            name={control.name}
                                            component="div"
                                            className="error-message"
                                          />
                                        </Form.Group>
                                      </div>
                                    </div>
                                  );
                                case "textarea":
                                  return (
                                    <div className="flex items-start  w-100">
                                      <div className="w-100">
                                        <div className="filter-label">
                                          {control.label}
                                        </div>
                                        <Form.Group controlId="validationFormik01">
                                          <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder={control.placeholder}
                                            name={control.name}
                                            onChange={handleChange}
                                            value={values[control?.name]}
                                            required={
                                              control.required ?? false
                                            }
                                            readOnly={
                                              control.readOnly ?? false
                                            }
                                            disabled={
                                              control.disabled ?? false
                                            }
                                            isValid={
                                              touched[control.name] &&
                                              !errors[control.name]
                                            }
                                            isInvalid={
                                              (!!touched[control.name] &&
                                                !!errors[control.name]) ??
                                              false
                                            }
                                          />
                                          <ErrorMessage
                                            name={control.name}
                                            component="div"
                                            className="error-message"
                                          />
                                        </Form.Group>
                                      </div>
                                    </div>
                                  );
                                case "date":
                                  return (
                                    <div className="flex items-start  w-100">
                                      <div className="w-100">
                                        <div className="filter-label">
                                          {control.label}
                                        </div>
                                        <Form.Group controlId="validationFormik01">
                                          <Form.Control
                                            type="date"
                                            placeholder={control.placeholder}
                                            name={control.name}
                                            // onChange={handleChange}
                                            onChange={(event) => {
                                              handleChange(event);
                                              if (control.onChange) {
                                                control.onChange(
                                                  event.target.value
                                                );
                                              }
                                            }}
                                            value={values[control?.name]}
                                            max={control.maxDate || ""}
                                            required={
                                              control.required ?? false
                                            }
                                            readOnly={
                                              control.readOnly ?? false
                                            }
                                            disabled={
                                              control.disabled ?? false
                                            }
                                            isValid={
                                              touched[control.name] &&
                                              !errors[control.name]
                                            }
                                            isInvalid={
                                              (!!touched[control.name] &&
                                                !!errors[control.name]) ??
                                              false
                                            }
                                          />
                                          <ErrorMessage
                                            name={control.name}
                                            component="div"
                                            className="error-message"
                                          />
                                        </Form.Group>
                                      </div>
                                    </div>
                                  );
                                case "datetime":
                                  return (
                                    <div className="flex items-start  w-100">
                                      <div className="w-100">
                                        <Form.Group controlId="validationFormik01">
                                          <Form.Control
                                            type="datetime-local"
                                            placeholder={control.placeholder}
                                            name={control.name}
                                            onChange={handleChange}
                                            value={values[control?.name]}
                                            required={
                                              control.required ?? false
                                            }
                                            readOnly={
                                              control.readOnly ?? false
                                            }
                                            disabled={
                                              control.disabled ?? false
                                            }
                                            isValid={
                                              touched[control.name] &&
                                              !errors[control.name]
                                            }
                                            isInvalid={
                                              (!!touched[control.name] &&
                                                !!errors[control.name]) ??
                                              false
                                            }
                                          />
                                          <ErrorMessage
                                            name={control.name}
                                            component="div"
                                            className="error-message"
                                          />
                                        </Form.Group>
                                      </div>
                                    </div>
                                  );

                                case "select":
                                  return (
                                    <>
                                      {control?.hideVisibility ? null : (
                                        <div className="flex items-start  w-100">
                                          <div className="w-100">
                                            <div className="filter-label">
                                              {control.label}
                                            </div>
                                            <Form.Group controlId="validationFormik01">
                                              <Form.Select
                                                name={control.name}
                                                onChange={(event: any) => {
                                                  handleChange(event);
                                                  if (control.onChange) {
                                                    control.onChange(
                                                      event.target.value
                                                    );
                                                  }
                                                }}
                                                value={values[control?.name]}
                                                required={
                                                  control.required ?? false
                                                }
                                                disabled={
                                                  control.disabled ?? false
                                                }
                                                isValid={
                                                  touched[control.name] &&
                                                  !errors[control.name]
                                                }
                                                isInvalid={
                                                  (!!touched[control.name] &&
                                                    !!errors[control.name]) ??
                                                  false
                                                }
                                              >
                                                <option value={""} >
                                                  {control.placeholder}
                                                </option>
                                                {/* disabled removed */}
                                                {control.options?.map(
                                                  (option: any, index: any) => (
                                                    <option
                                                      key={index}
                                                      value={option.value}
                                                    >
                                                      {option.label}
                                                    </option>
                                                  )
                                                )}
                                              </Form.Select>
                                              <ErrorMessage
                                                name={control.name}
                                                component="div"
                                                className="error-message"
                                              />
                                            </Form.Group>
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  );
                                case "typeahead":
                                  return (
                                    <div className="flex items-start  w-100">
                                      <div className="w-100">
                                        <div className="filter-label">
                                          {control.label}
                                        </div>
                                        <Form.Group controlId="validationFormik01">
                                          <Typeahead
                                            multiple={
                                              control?.selectType ==
                                                "multiple"
                                                ? true
                                                : false
                                            }
                                            id="basic-typeahead"
                                            onChange={(selected: any) => {
                                              setSelections(selected);
                                              if (selected.length) {
                                                control?.selectType ==
                                                  "multiple"
                                                  ? setFieldValue(
                                                    control.name,
                                                    selected
                                                  )
                                                  : setFieldValue(
                                                    control.name,
                                                    selected[0]
                                                  );
                                              }
                                            }}
                                            onInputChange={(text: any, event: any) => {
                                              if (control.onInputChange) {
                                                control.onInputChange(text);
                                              }
                                            }}
                                            options={
                                              control?.selectOptions
                                                ? control?.selectOptions
                                                : []
                                            }
                                            placeholder={control?.placeholder}
                                            selected={selections}
                                            ref={typeaheadRef}
                                          />
                                          <ErrorMessage
                                            name={control.name}
                                            component="div"
                                            className="error-message"
                                          />
                                        </Form.Group>
                                      </div>
                                    </div>
                                  );

                                default:
                                  return null;
                              }
                            })()}
                          </>
                        ))}
                      </div>
                    ))
                    : ""}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : null}
      <div
        className="mt-3"
        style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
      >
        <Button onClick={actionConfig.event} variant={actionConfig.variant}>
          {actionConfig.label}
        </Button>
        {resetButton && (
          <Button
            onClick={() => {
              resetButton.event();
              setSelections([]);
              if (typeaheadRef.current) {
                typeaheadRef.current.clear();
              }
            }}
            variant={resetButton.variant}
            className="me-1 resetButton"
            style={{
              border: "1px solid #0c8188",
              marginLeft: "1rem",
            }}
          >
            {resetButton.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterFormComponent;
