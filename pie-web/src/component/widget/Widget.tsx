import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardProps
} from "@material-ui/core";
import React, { useContext } from "react";
import Link from "component/common/control/Link";
import { I18nContext } from "context";

export type WidgetProps = CardProps & {
  // Widget title
  title?: string;
  // Location of full dataset
  location?: string;
};
/**
 * A minimal view on a dataset.
 */
const Widget = ({ children, title = "", location, ...props }: WidgetProps) => {
  const { more } = useContext(I18nContext);

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
