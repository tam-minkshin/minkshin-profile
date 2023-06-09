import * as React from "react";
import Input from "Core/Input";
import Button from "Core/Button";
import Grid from "Core/Grid";
import DatePicker from "Core/DatePicker";

interface FormProps {
  handleConfirm: (data: { [name: string]: string | number }) => void;
  defaultData: { [name: string]: string | number };
}

interface FormState {
  data: {
    [name: string]: string | number;
  };
}

class UpdateFormComponent extends React.Component<FormProps, FormState> {
  state: FormState = {
    data: {},
  };
  handleOnchange(name: string, value: string | number) {
    try {
      const { data } = this.state;
      data[name] = value;
      console.debug("UpdateFormComponent execute handleOnchange", data);
      this.setState({ data });
    } catch (error: any) {
      console.error(`UpdateFormComponent execute handleOnchange ${error.toString()}`);
    }
  }
  handleConfirm() {
    this.props.handleConfirm(this.state.data);
  }
  render() {
    return (
      <div>
        <form action="submit">
          <Input label="Họ tên" onChange={this.handleOnchange.bind(this)} name="name" defaultValue={this.props.defaultData.name ?? ""} />
          <Grid gap={1}>
            <Grid item>
              <Input type="email" label="Email" onChange={this.handleOnchange.bind(this)} name="email" defaultValue={this.props.defaultData.email ?? ""} />
            </Grid>
            <Grid item>
              <Input label="Phone" onChange={this.handleOnchange.bind(this)} name="phone" defaultValue={this.props.defaultData.phone ?? ""} />
            </Grid>
          </Grid>
          <DatePicker defaultValue={new Date(this.props.defaultData.dob).getTime()} label="Ngày sinh" onChange={this.handleOnchange.bind(this)} name="dob" />
        </form>
        <div className="flex justify-end">
          <Button className="mt-2" content="Confirm" onClick={this.handleConfirm.bind(this)} />
        </div>
      </div>
    );
  }
}

export default UpdateFormComponent;
