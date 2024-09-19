import { Link } from "react-router-dom";
import data from "../../json/data.json";
const { allOrganizers } = data;

const OrgLink = ({ name }) => {
  return <Link to={`/about/${name}`}>{allOrganizers[name].name}</Link>;
};

export default OrgLink;
