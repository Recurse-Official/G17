import React from "react";

interface Props {
  name: string;
}

function Header(props: Props) {
  const { name } = props;

  return <div className="text-2xl font-semibold text-gray-700">{name}</div>;
}

export default Header;
