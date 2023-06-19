import * as React from "react";
import Input from "Core/Input";
import Style from "Sass/Component/_form.module.scss";
import Button from "Core/Button";
import Grid from "Core/Grid";
import DatePicker from "Core/DatePicker";

interface FormProps {
  handleData: (data: { [name: string]: string | number }) => void;
}

interface FormState {
  data: {
    [name: string]: string | number;
  };
}

class FormComponent extends React.Component<FormProps, FormState> {
  state: FormState = {
    data: {
      dob: new Date(1998, 0, 20).getTime(),
    },
  };

  handleOnchange(name: string, value: string | number) {
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
          <Grid gap={1}>
            <Grid item>
              <Input label="Email" onChange={this.handleOnchange.bind(this)} name="email" />
            </Grid>
            <Grid item>
              <Input label="Phone" onChange={this.handleOnchange.bind(this)} name="phone" />
            </Grid>
          </Grid>
          <DatePicker defaultValue={new Date(1998, 0, 20).getTime()} label="Ngày sinh" onChange={this.handleOnchange.bind(this)} name="dob" />
          <Button className="mt-1" content={"Lưu"} onClick={this.handleSubmit.bind(this)} />
        </form>
      </div>
    );
  }
}

export default FormComponent;
