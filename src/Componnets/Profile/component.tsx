import * as React from "react";
import Input from "../../Core/Input";

interface ProfileProps {}

interface ProfileState {
  data: {
    [name: string]: string;
  };
}

class ProfileComponent extends React.Component<ProfileProps, ProfileState> {
  state: ProfileState = {
    data: {},
  };
  handleOnchange(name: string, value: string) {
    this.state.data[name] = value;
  }
  render() {
    return (
      <form action="submit">
        <Input label="Họ tên" onChange={this.handleOnchange} name="name" />
      </form>
    );
  }
}

export default ProfileComponent;
