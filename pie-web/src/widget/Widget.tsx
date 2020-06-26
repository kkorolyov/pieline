import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardProps,
} from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "../common/components";
import { i18nContext } from "../common/context";

type WidgetProps = CardProps & {
  // Widget title
  title: string;
  // Location of full dataset
  location?: string;
};
/**
 * A minimal view on a dataset.
 */
const Widget = ({ children, title, location, ...props }: WidgetProps) => {
  const { more } = useContext(i18nContext);

  return (
    <Card {...props}>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
      {location && (
        <CardActions>
          <Link to={location}>
            <Button>{more}</Button>
          </Link>
        </CardActions>
      )}
    </Card>
  );
};

export default Widget;
