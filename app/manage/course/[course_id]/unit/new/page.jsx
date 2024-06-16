"use client"


import {Button, Divider, Flex, Form, Input, Select, Space, Switch} from 'antd';
import LessonForm from "@/app/manage/course/[course_id]/unit/[unit_id]/lesson/new/page";
import {useState} from "react";
import {api} from "@/app/utils";

const {Option} = Select;
const {TextArea} = Input;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

export default function UnitForm({ params: {course_id} }) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        api('POST', `/course/${course_id}/units`, {
            ...values,
            '_method': 'PUT'
        }).then((res) => {
            alert('新增單元成功')
            location.href = `/manage/course/${course_id}/view`
        }).catch((err) => {
            alert(err.message)
        })
    };

    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{maxWidth: 600}}
        >
            <Form.Item name="name" label="單元名稱" rules={[{required: true}]}>
                <Input placeholder="未命名的單元"/>
            </Form.Item>
            <Form.Item name="description" label="描述">
                <TextArea placeholder="請輸入單元描述" autoSize/>
            </Form.Item>

            <Button type="primary" htmlType="submit" className={"w-full"}>
                新增單元
            </Button>


            {/*<Divider/>*/}
            {/*<Flex justify={"space-between"} className={"my-4"}>*/}
            {/*    <span>*/}
            {/*        新增素材*/}
            {/*    </span>*/}
            {/*    <Switch checkedChildren="開啟" unCheckedChildren="關閉" defaultChecked*/}
            {/*            onChange={(checked) => {*/}
            {/*                setLessonVisible(checked);*/}
            {/*            }}*/}
            {/*    />*/}
            {/*</Flex>*/}
            {/*{*/}
            {/*    lessonVisible && (*/}
            {/*        <LessonForm/>)*/}
            {/*}*/}

        </Form>
    );
};
