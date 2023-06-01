import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { loadToDoList, removeTask } from "../../store/slices/todoList.slice"
import EditModal from "./EditModal"
import { Button, Tooltip } from "antd"
import { PlusOutlined } from '@ant-design/icons'

const ToDoList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { toDoList } = useSelector((state: RootState) => state.toDoData)
    const [chosenTask, setChosenTask] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    const editTask = async (id: string) => {
        setChosenTask(id)
        handleModal(true)
    }

    const handleModal = (value: boolean) => {
        setOpen(value)
    }

    const deleteTask = (id: string) => {
        //TODO confirm dialog
        dispatch(removeTask(id))
    }

    const addTask = () => {
        setChosenTask(null)
        handleModal(true)
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