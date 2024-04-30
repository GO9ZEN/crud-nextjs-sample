"use server";

import Database from "better-sqlite3";

const maindbFileName = "app.db";

/////////////////////////////////////////////////////////////
export const getStaffList = async () => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("SELECT * FROM staff").all();

  db.close();

  return Promise.resolve({
    success: true,
    msg: "All Data Displayedxxxxxx",
    data: res,
  });
};

/////////////////////////////////////////////////////////////
export const getStaff = async (id: number) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("SELECT * FROM staff WHERE id = ?").get(id);

  db.close();

  return Promise.resolve({
    success: true,
    msg: "All Data Displayed",
    data: res,
  });
};

/////////////////////////////////////////////////////////////
export const insertStaff = async (data: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  //const sqlParts = GetInsertSqliteStatement(configurationSchema,data) insertStatementMain

  //main table
  const stmt = db.prepare(
    "INSERT INTO staff (name, username, nic, contracttype, role, password, confirmpassword) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  // contactno, nic, contracttype, role, password, confirmpassword
  // ?, ?, ?, ?, ?, ?

  const info = stmt.run(
    data.name,
    data.username,
    // data.contactno,
    data.nic,
    data.contracttype,
    data.role,
    data.password,
    data.confirmpassword
  );

  // const q= await  new Promise<true>((resolve)=> setTimeout(()=> resolve(true),3000  ))

  db.close();
  //const stmt = db.prepare('INSERT INTO cats (name, age) VALUES (?, ?)');
  if (info.changes == 1) {
    return Promise.resolve({
      success: true,
      msg: "Data Saved",
      lastInsertRowid: info.lastInsertRowid,
    });
  } else {
    return Promise.reject({ success: false, msg: "Insert failed" });
  }
};

/////////////////////////////////////////////////////////////
export const updateStaff = async (staffData: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  //const sqlParts = GetInsertSqliteStatement(configurationSchema,data) insertStatementMain

  //  const stmt = db.prepare("UPDATE people SET status = ? WHERE id = ?");
  //  const updates = stmt.run(status, id);
  try {
    //main table
    const res = db
      .prepare(
        "UPDATE staff SET name=?, username=?, nic=?, contracttype=?, role=?, password=?, confirmpassword=? WHERE id=?"
      )
      .run(
        staffData.name,
        staffData.username,
        staffData.nic,
        staffData.contracttype,
        staffData.role,
        staffData.password,
        staffData.confirmpassword,
        staffData.id
      );
    // contactno, nic, contracttype, role, password, confirmpassword
    // ?, ?, ?, ?, ?, ?

    // const info = res.run(id);

    // const q= await  new Promise<true>((resolve)=> setTimeout(()=> resolve(true),3000  ))

    db.close();
    //const stmt = db.prepare('INSERT INTO cats (name, age) VALUES (?, ?)');
    return Promise.resolve({
      success: true,
      msg: "All Data Updated",
      data: res,
    });
  } catch (error: any) {
    return Promise.resolve({
      success: false,
      msg: "Data Didn't Updated",
      data: error.message,
    });
  }
};

/////////////////////////////////////////////////////////////
export const deleteStaffId = async (id: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("DELETE FROM staff WHERE id = ?").run(id);

  db.close();

  return Promise.resolve({
    success: true,
    msg: "Data Deleted",
    data: res,
  });
};
