import { Badge, Card, Space, Tag, Tooltip } from "antd"
import { CheckCircleTwoTone, DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { PRIORITIES, TYPES } from "../../constants/tasks"

const TaskCard = ({ task, editTask, deleteTask }) => {
    return (
        <Card style={{ minWidth: '60vw' }} bodyStyle={{ padding: "10px 14px" }}>
            <div className="container">
                <div className="row align-items-center" style={{ marginBottom: '10px' }}>
                    {task.done ? <CheckCircleTwoTone className="col-1" twoToneColor={"green"} style={{ fontSize: '170%', textAlign: 'left' }} /> : <CheckCircleTwoTone className="col-1" twoToneColor={"grey"} style={{ fontSize: '170%', textAlign: 'left' }} />}
                    <div className="col-8" style={{ textAlign: 'left', color: TYPES.find(type => task.type === type.type)?.color }}>
                        <Tooltip title={TYPES.find(type => task.type === type.type)?.label}>
                            <h3 style={{ display: 'inline' }}>
                                {task.task}
                            </h3>
                        </Tooltip>
                    </div>
                    <div className="col-3" style={{ textAlign: 'right' }}>
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
                    <div className="col-10" style={{ textAlign: 'start' }}>
                        <Space size={[0, 8]} wrap>
                            {task.subTasks?.map(subT =>
                                <Tag color="default">{subT}</Tag>
                            )}
                        </Space>
                    </div>
                    <div className="col-1">
                        <Badge status={PRIORITIES.find(p => task.priority === p.priority)?.antdColor} /> {/* TODO ts */}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default TaskCard