import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { loadToDoList, removeTask } from "../../store/slices/todoList.slice"
import EditModal from "./EditModal"
import { Button, Collapse, Space, Tooltip } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import { TYPES } from "../../constants/tasks"

const ToDoList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { toDoList } = useSelector((state: RootState) => state.toDoData)
    const [chosenTask, setChosenTask] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const tasksByType = toDoList.reduce((acc, obj) => {
        const type = obj.type;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(obj);
        return acc;
    }, {})
    const [activeKeys, setActiveKeys] = useState<string | string[]>(TYPES.map(type => type.type)); // Estado local para controlar las keys activas


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

    const handleCollapseChange = (keys: string | string[]) => {
        setActiveKeys(keys)
    }

    useEffect(() => {
        dispatch(loadToDoList())
    }, [])

    return (
        <>
            <div className="row align-items-center justify-content-center" style={{ marginBottom: '10px', borderRadius: '10px', backgroundColor: '#FAFAFA', height: '50px' }}>
                <Tooltip title="Crear tarea">
                    <Button onClick={addTask} icon={<PlusOutlined />} />
                </Tooltip>
                <div style={{ marginLeft: '10px' }}>
                    Añadir nueva tarea
                </div>
            </div>
            <Collapse bordered={false} activeKey={activeKeys} onChange={handleCollapseChange}>
                {
                    Object.keys(tasksByType)?.map(type =>
                        <Collapse.Panel header={TYPES.find(t => type === t.type)?.label} key={type} style={{ textAlign: 'left' }} >
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                {tasksByType[type]?.sort((a, b) => a.priority - b.priority)?.map(task =>
                                    <TaskCard task={task} editTask={editTask} deleteTask={deleteTask} />
                                )}
                            </Space>
                        </Collapse.Panel>
                    )
                }
            </Collapse>
            <EditModal open={open} id={chosenTask} handleModal={handleModal} />
        </>
    )
}

export default ToDoList