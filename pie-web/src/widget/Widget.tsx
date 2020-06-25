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
  title: string;
  location: string;
};
/**
 * A minimal view on a dataset.
 * Provides a link to a full view.
 */
const Widget = ({ children, title, location, ...props }: WidgetProps) => {
  const { more } = useContext(i18nContext);

  return (
    <Card {...props}>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
      <CardActions>
        <Link to={location}>
          <Button>{more}</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Widget;
