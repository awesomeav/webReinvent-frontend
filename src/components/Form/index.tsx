import { FC } from "react";
import Input from "./Input";

export enum FieldType {
  Input = "INPUT",
}

const fieldMap: Record<string, any> = {
  [FieldType.Input]: Input,
};

export type LayoutProps = {
  fields: Array<Record<string, any>>;
  className?: string;
};

const Layout: FC<LayoutProps> = ({ fields, className = "space-y-8" }) => {
  return (
    <div className={className}>
      {fields.map((field, index) => {
        const Component = fieldMap[field.type];
        return <Component key={index} {...field} />;
      })}
    </div>
  );
};

export default Layout;
