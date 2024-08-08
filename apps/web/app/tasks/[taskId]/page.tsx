"use client";

import React from "react";
import { Button } from "@repo/ui";

import styles from "../../../styles/index.module.css"

export default function Web({
  params,
}: {
  params: { taskId: string };
}) {
  const id = params.taskId

  return (
    <div className={styles.container}>
      <h1>Task {id} </h1>
      <Button onClick={() => console.log("Pressed!")} text="Boop" />
    </div>
  );
}
