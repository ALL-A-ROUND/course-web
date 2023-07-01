"use client"
import {api, makeFeature} from "@/app/utils";
import {useOnBeforeUnload} from "@/app/hooks";
import Swal from "sweetalert2";
import Link from "next/link";
import {Cog8ToothIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";

function FeatureEditComponent({feature, config, setConfig, setOnBeforeUnload}) {
    function checkBoxChange(e) {
        setOnBeforeUnload(true)

        const checked = e.target.checked
        const new_config = {...config}
        new_config.features = new_config.features ?? {}
        new_config.features[feature.id] = new_config.features[feature.id] ?? {}
        new_config.features[feature.id].enabled = !!checked;

        setConfig(new_config)
    }

    return (
        <fieldset>
            <div className={"text-lg font-bold flex justify-between"}>
                <div>{feature.name}</div>
                <Link href={feature.path + '/manage'} target={'_blank'}>
                    <Cog8ToothIcon className={"inline-block w-6 h-6"}/>
                </Link>
            </div>
            <legend className="contents text-md font-medium text-gray-900">
                是否啟用
            </legend>
            <p className="text-sm text-gray-500">
                啟用之後，學生將可以使用此功能。
            </p>
            <div className="mt-4 space-y-4">
                <div className="flex items-center">
                    <input
                        id={feature.id + "-enabled"}
                        name={feature.id + "-enabled"}
                        type="checkbox"
                        onChange={checkBoxChange}
                        checked={config?.features?.[feature.id]?.enabled}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={feature.id + "-enabled"}
                           className="ml-3 block text-sm font-medium text-gray-700">
                        啟用
                    </label>
                </div>
            </div>
        </fieldset>
    )
}

export default function FeatureEdit({params, course}) {
    const features = makeFeature(params)
    const [config, setConfig] = useState(course?.config ?? {})
    const [, setOnBeforeUnload] = useOnBeforeUnload();

    useEffect(() => {
        setConfig(course?.config ?? {})
    }, [course])

    const saveConfig = (e) => {
        api('PATCH', '/course/' + params.course_id, {
            config: JSON.stringify(config)
        }).then(data => {
            setOnBeforeUnload(false)
            Swal.fire({
                icon: 'success',
                title: '儲存成功',
            })
        })
    }

    return (
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">課程設定</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        課程的功能設定
                    </p>
                </div>
                <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                    {features.filter(x => x.id !== 'manage').map(feature => (
                        <FeatureEditComponent key={feature.id}
                                              feature={feature}
                                              config={config} setConfig={setConfig}
                                              setOnBeforeUnload={setOnBeforeUnload}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-end border-t pt-2 mt-4">
                <button
                    onClick={saveConfig}
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    儲存
                </button>
            </div>
        </div>
    )
}