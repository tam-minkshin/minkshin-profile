import * as React from "react";
import Input from "Core/Input";
import Grid from "Core/Grid";

interface ProfileProps {}

interface ProfileState {
  data: {
    [name: string]: string;
  };
}

class ProfileComponent extends React.Component<ProfileProps, ProfileState> {
  state: ProfileState = {
    data: {
      name: "",
    },
  };
  handleOnchange(name: string, value: string) {
    try {
      const { data } = this.state;
      data[name] = value;
      console.debug("ProfileComponent execute handleOnchange", data);
      this.setState({ data });
    } catch (error: any) {
      console.error(`ProfileComponent execute handleOnchange ${error.toString()}`);
    }
  }
  render() {
    return (
      <div className="px-7">
        <form action="submit">
          <Grid gap={2}>
            <Grid item xs={12}>
              <Input label="Họ tên" onChange={this.handleOnchange.bind(this)} name="name" />
            </Grid>
            <Grid item xs={6}>
              <Input label="Email" onChange={this.handleOnchange.bind(this)} name="name" />
            </Grid>
            <Grid item xs={6}>
              <Input label="Phone" onChange={this.handleOnchange.bind(this)} name="name" />
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default ProfileComponent;
