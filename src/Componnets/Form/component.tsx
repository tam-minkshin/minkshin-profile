import * as React from "react";
import Input from "Core/Input";
import Style from "Sass/Component/_form.module.scss";

interface FormProps {
  handleData: (data: { [name: string]: string }) => void;
}

interface FormState {
  data: {
    [name: string]: string;
  };
}

class FormComponent extends React.Component<FormProps, FormState> {
  state: FormState = {
    data: {},
  };
  handleOnchange(name: string, value: string) {
    try {
      const { data } = this.state;
      data[name] = value;
      console.debug("FormComponent execute handleOnchange", data);
      this.setState({ data });
    } catch (error: any) {
      console.error(`FormComponent execute handleOnchange ${error.toString()}`);
    }
  }
  handleSubmit() {
    this.props.handleData(this.state.data);
  }
  render() {
    return (
      <div className={Style["form--container"]}>
        <h3 className={Style["title--h3"]}>Form</h3>
        <form action="submit">
          <Input label="Họ tên" onChange={this.handleOnchange.bind(this)} name="name" />
          <div className={Style["item--grid"]}>
            <Input label="Email" onChange={this.handleOnchange.bind(this)} name="name" />
            <Input label="Phone" onChange={this.handleOnchange.bind(this)} name="name" />
          </div>
        </form>
      </div>
    );
  }
}

export default FormComponent;
