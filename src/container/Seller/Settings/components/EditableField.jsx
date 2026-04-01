import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const EditableInput = ({ placeholder, type = "text", defaultValue = "", ...props }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);

  if (!isEditing) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        title="Klik untuk mengubah"
        className="w-full px-3 py-2 border border-transparent rounded-md hover:bg-gray-100 cursor-text min-h-[40px] text-sm text-gray-700 flex items-center transition-colors"
      >
        {type === "file" ? (
          <span className="text-gray-500 italic">Klik untuk unggah file</span>
        ) : value ? (
          value
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </div>
    );
  }

  return (
    <Input
      {...props}
      type={type}
      value={type === "file" ? undefined : value}
      onChange={(e) => {
        if (type !== "file") setValue(e.target.value);
        if (props.onChange) props.onChange(e);
      }}
      onBlur={() => setIsEditing(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter") setIsEditing(false);
      }}
      autoFocus
      placeholder={placeholder}
    />
  );
};

export const EditableTextarea = ({ placeholder, defaultValue = "", ...props }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);

  if (!isEditing) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        title="Klik untuk mengubah"
        className="w-full px-3 py-2 border border-transparent rounded-md hover:bg-gray-100 cursor-text min-h-[80px] text-sm text-gray-700 whitespace-pre-wrap transition-colors"
      >
        {value ? value : <span className="text-gray-400">{placeholder}</span>}
      </div>
    );
  }

  return (
    <Textarea
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (props.onChange) props.onChange(e);
      }}
      onBlur={() => setIsEditing(false)}
      autoFocus
      placeholder={placeholder}
      className="min-h-[80px]"
    />
  );
};

export const EditableSwitch = ({ defaultChecked = false, ...props }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [checked, setChecked] = useState(defaultChecked);

  if (!isEditing) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        title="Klik untuk mengubah"
        className="cursor-pointer flex items-center p-1 border border-transparent hover:border-gray-200 rounded transition-colors"
      >
        <div className="pointer-events-none opacity-80">
          <Switch {...props} checked={checked} disabled />
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseLeave={() => setIsEditing(false)}
      className="flex items-center p-1 border border-gray-300 rounded shadow-sm"
      tabIndex={-1}
    >
      <Switch
        {...props}
        checked={checked}
        onCheckedChange={(c) => {
          setChecked(c);
          if (props.onCheckedChange) props.onCheckedChange(c);
        }}
      />
    </div>
  );
};
