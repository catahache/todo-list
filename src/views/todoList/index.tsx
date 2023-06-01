import { Button, Tooltip } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect, useState } from "react"
import { loadToDoList, removeTask } from "../../store/slices/todoList.slice"
import EditModal from "./EditModal"
import TaskCard from "./TaskCard"

const ToDoList = () => {
    const { toDoList } = useSelector((state: RootState) => state.toDoData)
    const dispatch = useDispatch<AppDispatch>()
    const [open, setOpen] = useState(false)
    const [chosenTask, setChosenTask] = useState<string | null>(null)

    const editTask = async (id: string) => {
        setChosenTask(id)
        handleModal(true)
    }

    const addTask = () => {
        setChosenTask(null)
        handleModal(true)
    }

    const deleteTask = (id: string) => {
        //TODO confirm dialog
        dispatch(removeTask(id))
    }

    const handleModal = (value: boolean) => {
        setOpen(value)
    }

    useEffect(() => {
        dispatch(loadToDoList())
    }, [])

    return (
        <>
            <Tooltip title="Crear tarea">
                <Button onClick={addTask} type="primary" shape="circle" icon={<PlusOutlined />} />
            </Tooltip>
            {toDoList.map(task =>
                <TaskCard task={task} editTask={editTask} deleteTask={deleteTask} />
            )}
            <EditModal open={open} id={chosenTask} handleModal={handleModal} />
        </>
    )
}

export default ToDoList