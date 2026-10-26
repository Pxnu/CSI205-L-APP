"use client";

import { useEffect, useState } from "react";

import { Toggle } from "@/components/tailgrids/core/toggle";
import { Pagination } from "@/components/tailgrids/core/pagination";
import { Spinner } from "@/components/tailgrids/core/spinner";
import { Plus, ClockThree, Trash1, Check } from "@tailgrids/icons";
import { Button } from "@/components/tailgrids/core/button";
import { fetchTodos } from "@/data/todos";
import type { TodoType } from "@/data/todos";

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { TextField } from "@/components/tailgrids/core/text-field";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/tailgrids/core/native-select";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todosRaw, setTodosRaw] = useState<TodoType[]>([]);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [onlyWaiting, setOnlyWaiting] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    const _todoRawStr = localStorage.getItem("todosRaw");
    if (_todoRawStr === null) {
      // setTodosRaw([])
      fetchTodos()
        .then((data) => setTodosRaw(data as TodoType[]))
        .catch(() => setTodosRaw([]))
        .finally(() => setIsLoading(false));
    } else {
      setTodosRaw(JSON.parse(_todoRawStr) as TodoType[]);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todosRaw", JSON.stringify(todosRaw));
  }, [todosRaw]);

  // onload
  // useEffect(() => {
  //   fetchTodos()
  //     .then((data) => {
  //       setTodoRaw(data as TodoType[]);
  //     })
  //     .catch((error) => {
  //       setTodoRaw([]);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  // todoRaw, onlyWaiting = [] => todos
  useEffect(() => {
    onlyWaiting
      ? setTodos(todosRaw.filter((todo) => todo.completed === false))
      : setTodos(todosRaw);
  }, [todosRaw, onlyWaiting]);

  // todos, itemsPerPage => [] => totalPages
  useEffect(() => {
    setTotalPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  // totalPages => [] => currentPage
  useEffect(() => {
    if (totalPages > 0) {
      if (currentPage <= 0) {
        setCurrentPage(1);
      } else if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }
  }, [totalPages]);

  // deleteTodo
  const deleteTodo = (id: number) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };

  // makeDone
  const makeDone = (id: number) => {
    const selected = todosRaw.find((todo) => {
      return todo.id === id;
    });
    // edit (not update)
    selected!.completed = true;

    // update state (setter(geter) <-- wrong)
    setTodosRaw([...todosRaw]); // <-- correct
  };

  // addTodo
  const addTodo = () => {
    const idDom = document.getElementById("id") as HTMLInputElement;
    const titleDom = document.getElementById("title") as HTMLInputElement;

    // validate
    const titleStr = titleDom.value.trim();
    if (titleStr === "") return;

    // new todo
    const newTodo: TodoType = {
      userId: 1,
      id: Number(idDom.value),
      title: titleDom.value.trim(),
      completed: false,
    };

    // add to todosRaw
    setTodosRaw([...todosRaw, newTodo]);
  };

  return (
    // todo container
    <>
      <div className="w-full max-w-250 mx-auto px-4 md:px-0">
        {/* todo controller */}
        <div className="flex justify-between">
          {/* toggle */}
          <div className="flex items-center">
            <Toggle
              label="Show only waiting"
              checked={onlyWaiting}
              onChange={(e) => setOnlyWaiting(e.target.checked)}
            />
            &nbsp;
            <Button
              className={
                "bg-warning-500 text-black h-8 p-2 rounded-md pointer-events-none"
              }
            >
              waiting
              <ClockThree />
            </Button>
          </div>
          {/* dropdown */}
          <div className="w-1/3">
            <NativeSelect
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <NativeSelectOption value={5}>
                5 items per page
              </NativeSelectOption>
              <NativeSelectOption value={10}>
                10 items per page
              </NativeSelectOption>
              <NativeSelectOption value={50}>
                50 items per page
              </NativeSelectOption>
            </NativeSelect>
          </div>
        </div>

        {/* todo table */}
        <div>
          <TableRoot>
            <TableHeader>
              <TableRow className="bg-black text-white-100">
                <TableHead className="w-1/5">ID</TableHead>
                <TableHead className="w-1/2">Title</TableHead>
                <TableHead className="flex items-center justify-end gap-1">
                  Completed
                  <Button onClick={() => setShowDialog(true)}>
                    <Plus />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* show spinner while loading */}
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && todos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-red-500">
                    No Data, may be connection refused (reload again)
                  </TableCell>
                </TableRow>
              )}

              {/* render data */}
              {todos
                .filter((todo, index) => {
                  const lower = (currentPage - 1) * itemsPerPage;
                  const upper = currentPage * itemsPerPage - 1;
                  return index >= lower && index <= upper;
                })

                .map((todos) => {
                  return (
                    <TableRow className="text-sm" key={todos.id}>
                      <TableCell>
                        <span className="bg-gray-500 text-white-100 px-4 py-2 rounded-md text-md font-bold">
                          {todos.id}
                        </span>
                      </TableCell>

                      <TableCell className="text-black text-left">
                        {todos.title}
                      </TableCell>

                      <TableCell className="flex gap-1 justify-end items-center">
                        {todos.completed ? (
                          <Button
                            className={
                              "bg-success-500 text-white-100 h-8 rounded-md pointer-events-none"
                            }
                          >
                            done <Check />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => makeDone(todos.id)}
                            className={
                              "bg-warning-500 hover:bg-yellow-700 text-black hover:text-white-100 rounded-md"
                            }
                          >
                            waiting <ClockThree />
                          </Button>
                        )}

                        <Button
                          onClick={() => deleteTodo(todos.id)}
                          className={"bg-red-500 hover:bg-red-700 rounded-md"}
                        >
                          <Trash1 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {/* completed = false */}
              {/* <TableRow className="text-sm">
              <TableCell>
                <span className="bg-gray-500 text-white-100 px-[1rem] py-[.5rem] rounded-md text-md font-bold">
                  1
                </span>
              </TableCell>

              <TableCell className="text-black text-left">
                Lorem, ipsum dolor.
              </TableCell>

              <TableCell className="flex gap-1 justify-end">
                <Button
                  className={
                    "bg-warning-500 text-black rounded-md pointer-events-none"
                  }
                >
                  waiting <ClockThree />
                </Button>
                <Button className={"bg-red-500 rounded-md pointer-events-none"}>
                  <Trash1 />
                </Button>
              </TableCell>
            </TableRow> */}

              {/* completed = true */}
              {/* <TableRow className="text-sm">
              <TableCell>
                <span className="bg-gray-500 text-white-100 px-[1rem] py-[.5rem] rounded-md text-md font-bold">
                  4
                </span>
              </TableCell>

              <TableCell className="text-black text-left">
                Lorem, ipsum dolor.
              </TableCell>

              <TableCell className="flex gap-1 justify-end items-center justify-end">
                <Button
                  className={
                    "bg-success-500 text-white-100 h-[2rem] rounded-md pointer-events-none"
                  }
                >
                  done <Check />
                </Button>
                <Button className={"bg-red-500 rounded-md pointer-events-none"}>
                  <Trash1 />
                </Button>
              </TableCell>
            </TableRow> */}
            </TableBody>
          </TableRoot>
        </div>

        {/* pagination */}
        {todos.length > 0 && (
          <div className="mt-1 w-1/3 mx-auto flex justify-center items-center">
            <Button
              size="sm"
              appearance="outline"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                sideLayout="icon"
              />
            </div>
            <Button
              size="sm"
              appearance="outline"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </div>
        )}
      </div>

      <Backdrop isOpen={showDialog} onOpenChange={setShowDialog}>
        <Dialog>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl capitalize">
              <Plus className="bg-blue-100 rounded-md" size={32} />
              new todo
            </DialogTitle>
          </DialogHeader>

          <DialogBody>
            <form className="flex flex-col gap-4">
              <TextField className="flex flex-col gap-1.5">
                <Label className="uppercase font-bold">id (auto)</Label>
                <Input
                  className="w-full pointer-events-none bg-gray-100 text-gray-400"
                  value={
                    todosRaw.reduce((p, t) => (t.id > p ? t.id : p), 0) + 1
                  }
                  id="id"
                />
              </TextField>

              <TextField className="flex flex-col gap-1.5">
                <Label className="capitalize font-bold">title</Label>
                <Input
                  placeholder="ใส่งานที่ต้องการเพิ่ม"
                  className="w-full"
                  autoFocus
                  id="title"
                />
              </TextField>
            </form>
          </DialogBody>

          <DialogFooter>
            <DialogClose appearance="outline">Cancel</DialogClose>
            <DialogClose className=" capitalize" onClick={() => addTodo()}>
              add to todo
            </DialogClose>
          </DialogFooter>
        </Dialog>
      </Backdrop>
    </>
  );
}
