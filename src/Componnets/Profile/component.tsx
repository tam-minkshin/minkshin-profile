import * as React from "react";
import { Disclosure } from "@headlessui/react";

interface ProfileProps {}

interface ProfileState {}

class ProfileComponent extends React.Component<ProfileProps, ProfileState> {
  state = {};
  render() {
    return (
      <Disclosure>
        <Disclosure.Button className="py-2">Is team pricing available?</Disclosure.Button>
        <Disclosure.Panel className="text-gray-500">Yes! You can purchase a license that you can share with your entire team.</Disclosure.Panel>
      </Disclosure>
    );
  }
}

export default ProfileComponent;
