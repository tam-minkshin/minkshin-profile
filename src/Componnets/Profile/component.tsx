import * as React from "react";
import FormComponent from "Componnets/Form/component";

interface ProfileProps {
  
}

interface ProfileState {
  data: {
    [name: string]: string;
  };
}

class ProfileComponent extends React.Component<ProfileProps, ProfileState> {
  state: ProfileState = {
    data: {},
  };
  handleData(dataProp: { [name: string]: string }) {
    try {
      const { data } = this.state;
      for (const key in dataProp) {
        data[key] = dataProp[key];
      }
      console.debug("ProfileComponent execute handleOnchange", data);
      this.setState({ data });
    } catch (error: any) {
      console.error(`ProfileComponent execute handleOnchange ${error.toString()}`);
    }
  }
  render() {
    return (
      <div className="border-2 border-outline px-48">
        <FormComponent handleData={this.handleData.bind(this)}/>
      </div>
    );
  }
}

export default ProfileComponent;
