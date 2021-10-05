const components = {
  h2: (props) => (
    <h2 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-3">
      {props.children}
    </h2>
  ),
  ul: (props) => <ul className="list-disc list-inside">{props.children}</ul>,
  li: (props) => <li className="text-gray-900">{props.children}</li>,
  p: (props) => <p className="text-gray-900">{props.children}</p>,
};

export default components;
