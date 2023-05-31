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
    data: {
      name:""
    },
  };
  handleOnchange(name: string, value: string) {
    try {
      const { data } = this.state;
      data[name] = value;
      console.debug('ProfileComponent execute handleOnchange',data)
      this.setState({ data });
    } catch (error:any) {
      console.error(`ProfileComponent execute handleOnchange ${error.toString()}`)
    }
  }
  render() {
    return (
      <form action="submit" className="w-36">
        <Input label="Họ tên" onChange={this.handleOnchange.bind(this)} name="name" />
      </form>
    );
  }
}

export default ProfileComponent;
