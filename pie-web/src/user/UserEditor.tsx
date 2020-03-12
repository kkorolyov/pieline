import React, { useState } from "react";

type UserEditorProps = {
  id?: string;
};

function UserEditor(props: UserEditorProps) {
  const [id, setId] = useState(props.id);
  const [email, setEmail] = useState(null);
	const [displayName, setDisplayName] = useState(null);
	
}

export default UserEditor;
