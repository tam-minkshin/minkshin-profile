import * as React from "react";
import FormComponent from "Componnets/Form/component";
import Helper from "Service/Helper";
import Style from "Sass/Component/_profile.module.scss";

interface ProfileProps {}

export interface ProfileState {
  data: {
    [name: string]: string | number;
  };
}

class ProfileComponent extends React.Component<ProfileProps, ProfileState> {
  state: ProfileState = {
    data: {},
  };
  
  handleData(dataProp: { [name: string]: string | number }) {
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
    const { data } = this.state;
    return (
      <>
        <div className={Style["section"]}>
          {Helper.isEmpty(data) ? (
            <FormComponent handleData={this.handleData.bind(this)} />
          ) : (
            <>
              <p className="text-color-success">
                Họ tên: <span className="text-white">{data.name ?? "-"}</span>
              </p>
              <p className="text-color-success">
                Email: <span className="text-white">{data.email ?? "-"}</span>
              </p>
              <p className="text-color-success">
                SĐT: <span className="text-white">{data.phone ?? "-"}</span>
              </p>
            </>
          )}
        </div>
        {/* <div className={Style["section"]}>
          <Calendar minDate={new Date("2020/5/10").getTime()} maxDate={new Date("2023/6/20").getTime()} minYear={1900} maxYear={2100} onPick={()=>{}}/>
        </div> */}
      </>
    );
  }
}

export default ProfileComponent;
