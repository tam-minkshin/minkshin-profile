import * as React from "react";
import FormComponent from "Componnets/Form/component";
import Helper from "Service/Helper";
import Style from "Sass/Component/_profile.module.scss";
import Dialog from "Core/Dialog/dialog.core";
import UpdateProfileComponent from "Componnets/UpdateForm";

interface ProfileProps {}

export interface ProfileState {
  data: {
    [name: string]: string | number;
  };
  isShow: boolean;
}

class ProfileComponent extends React.Component<ProfileProps, ProfileState> {
  state: ProfileState = {
    data: {},
    isShow: false,
  };
  
  handleData(dataProp: { [name: string]: string | number }) {
    try {
      const { data } = this.state;
      console.debug("ProfileComponent execute handleOnchange dataProp", dataProp);

      for (const key in dataProp) {
        data[key] = dataProp[key];
      }
      console.debug("ProfileComponent execute handleOnchange", data);
      this.setState({ data });
    } catch (error: any) {
      console.error(`ProfileComponent execute handleOnchange ${error.toString()}`);
    }
  }
  handleConfirm(dataProp: { [name: string]: string | number }) {
    let { data, isShow } = this.state;
    for (const key in dataProp) {
      data[key] = dataProp[key];
    }
    isShow = false;
    this.setState({ data, isShow });
  }
  handleShow() {
    this.setState({ isShow: true });
  }
  render() {
    const { data, isShow } = this.state;
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
              <p className="text-color-success">
                Ngày sinh: <span className="text-white">{data.dob ? Helper.formatDate(data.dob) : "-"}</span>
              </p>
              <Dialog contentBtn="Cập nhật" title="Update Form" handleShow={this.handleShow.bind(this)} isShowDialog={isShow} content={<UpdateProfileComponent handleConfirm={this.handleConfirm.bind(this)} defaultData={data} />} />
            </>
          )}
        </div>
      </>
    );
  }
}

export default ProfileComponent;
