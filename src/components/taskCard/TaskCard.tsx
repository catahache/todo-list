import { Badge, Card, Space, Tag, Tooltip } from "antd"
import { CheckCircleTwoTone, DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { TYPES } from "../../constants/tasks"
import './taskCard.css'
import '../../style/globalStyles.css'
import { Task } from "../../interfaces/todoList"
import { FC } from "react"
import { PresetStatusColorTypes } from "antd/es/_util/colors"

interface TaskCardProps {
    task: Task, 
    editTask: (id: string) => void, 
    deleteTask: (id: string) => void
}

const TaskCard: FC<TaskCardProps> = ({ task, editTask, deleteTask }) => {

    return (
        <Card className="cardStyle" bodyStyle={{ padding: "10px 14px" }}>
            <div className="container">
                <div className="row align-items-center mb-10">
                    {task.done ? <CheckCircleTwoTone className="col-1 checkStyle" twoToneColor={"green"} /> : <CheckCircleTwoTone className="col-1 checkStyle" twoToneColor={"grey"} />}
                    <div className="col-8 text-align-left" style={{ color: TYPES.find(type => task.type === type.type)?.color }}>
                        <Tooltip title={TYPES.find(type => task.type === type.type)?.label}>
                            <h3 style={{ display: 'inline' }}>
                                {task.task}
                            </h3>
                        </Tooltip>
                    </div>
                    <div className="col-3 text-align-right">
                        <Space>
                            <Tooltip title="Editar">
                                <EditTwoTone onClick={() => { editTask(task._id) }} />
                            </Tooltip>
                            <Tooltip title="Eliminar">
                                <DeleteTwoTone onClick={() => { deleteTask(task._id) }} />
                            </Tooltip>
                        </Space>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10 text-align-start">
                        <Space size={[0, 8]} wrap>
                            {task.subTasks?.map(subT =>
                                <Tag color="default">{subT}</Tag>
                            )}
                        </Space>
                    </div>
                    <div className="col-1 text-align-center">
                        <Badge status={PresetStatusColorTypes[task.priority]} />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default TaskCard