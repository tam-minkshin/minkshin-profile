import * as React from "react";
import FormComponent from "Componnets/Form/component";
import Helper from "Service/Helper";
import Style from "Sass/Component/_profile.module.scss";
import Dialog from "Core/Dialog";
import UpdateProfileComponent from "Componnets/UpdateForm";
import TranferList from "Core/TranferList";
import Tabs from "Core/Tabs";
import { ConfigTab } from "Core/Tabs/tabs.core";
import Image from "Core/Image";
import Table from "Core/Table";

interface ProfileProps {}
type TranferItem = Array<{ label: string; value: string }>;
export interface ProfileState {
  data: {
    [name: string]: string;
  };
  leftList: TranferItem;
  rightList: TranferItem;
  isShow: boolean;
  configTab: ConfigTab;
}

class ProfileComponent extends React.Component<ProfileProps, ProfileState> {
  state: ProfileState = {
    data: {},
    leftList: [{ label: "Chữ A", value: "A" }],
    rightList: [
      { label: "Chữ B", value: "B" },
      { label: "Chữ C", value: "C" },
    ],
    isShow: false,
    configTab: [],
  };

  componentDidMount(): void {
    let {configTab} = this.state
    for (let i = 0; configTab.length < 3; i++) {
      configTab.push({ id: i, label: `Tab ${i}`, content: <>{i}</> });
    }
    this.setState({configTab})
  }
  handleData(dataProp: { [name: string]: string | number }) {
    try {
      const { data } = this.state;
      console.debug("ProfileComponent execute handleOnchange dataProp", dataProp);
      for (const key in dataProp) {
        data[key] = `${dataProp[key]}`;
      }
      console.debug("ProfileComponent execute handleOnchange", data);
      this.setState({ data });
    } catch (error: any) {
      console.error(`ProfileComponent execute handleOnchange ${error.toString()}`);
    }
  }
  handleShow() {
    let { isShow } = this.state;
    isShow = !isShow;
    this.setState({ isShow });
  }
  handleConfirm(dataProp: { [name: string]: string | number }) {
    let { data } = this.state;
    for (const key in dataProp) {
      data[key] = `${dataProp[key]}`;
    }
    this.handleShow();
    this.setState({ data });
  }
  handleTranferList<L>(left: L, right: L) {
    try {
      console.debug("ProfileComponent execute handleTranferList left", left);
      console.debug("ProfileComponent execute handleTranferList right", right);
    } catch (error: any) {
      console.error(`ProfileComponent execute handleTranferList ${error.toString()}`);
    }
  }
  render() {
    const { data, isShow, leftList, rightList } = this.state;
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
                Ngày sinh: <span className="text-white">{data.dob ? Helper.formatDate(Number(data.dob)) : "-"}</span>
              </p>
              <div className="mt-2">
                <Dialog handleShow={this.handleShow.bind(this)} contentBtn="Cập nhật" title="Update Form" isShowDialog={isShow} content={<UpdateProfileComponent handleConfirm={this.handleConfirm.bind(this)} defaultData={data} />} />
              </div>
            </>
          )}
        </div>
        <div className={Style["section"]}>
          <TranferList leftList={leftList} rightList={rightList} onChange={this.handleTranferList.bind(this)} />
        </div>
        <div className={Style["section"]}>
          <Tabs configTab={this.state.configTab} />
        </div>
        <div className={Style["section"]}>
          <Image linkImg="https://picsum.photos/200/300?random=1"/>
        </div>
        <div className={Style["section"]}>
          <Table/>
        </div>
      </>
    );
  }
}

export default ProfileComponent;
