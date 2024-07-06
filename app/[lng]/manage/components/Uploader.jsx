import React, {useEffect, useState} from 'react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import {Dashboard} from '@uppy/react';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import {useIdToken} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";
import Tus from "@uppy/tus";

import ImageEditor from '@uppy/image-editor';
import '@uppy/image-editor/dist/style.min.css';

function createUppy(userId, token) {
    let uy;
    try {
        uy = new Uppy({meta: {userId}}).use(Tus, {
            endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT + '/tus',
            retryDelays: [0, 1000, 3000, 5000],
            headers: {
                'Accept': 'application/json',
                'X-TOKEN': "test",
                'Authorization': 'Bearer ' + token
            },
            chunkSize: 100 * 1024 * 1024,
        }).use(ImageEditor, {
            locale: {
                strings: {
                    revert: 'Revert',
                    rotate: '旋轉',
                    zoomIn: '放大',
                    zoomOut: '縮小',
                    flipHorizontal: 'Flip horizontal',
                    aspectRatioSquare: 'Crop square',
                    aspectRatioLandscape: 'Crop landscape (16:9)',
                    aspectRatioPortrait: 'Crop portrait (9:16)',
                },
            }
        });

    } catch (e) {
        console.log(e);
    }
    return uy;
}


export default function Uploader( {setFile, min_accept_ratio = -1, max_accept_ratio = -1}) {
    const [user, loading, error] = useIdToken(auth);
    const [uppy, setUppy] = useState(createUppy());

    useEffect(() => {
        if (user) {
            (async () => {
                setUppy(createUppy(user?.uid, await user?.getIdToken()));
            })();
        }
    }, [user]);

    useEffect(() => {
        if (uppy) {
            uppy.on('file-editor:complete', (file) => {
                console.log(
                    'file-editor:complete',
                    file
                )

                const img = new Image();
                img.src = URL.createObjectURL(file.data);
                img.onload = () => {
                    const aspect_ratio = img.width / img.height;
                    if (min_accept_ratio > 0 && aspect_ratio < min_accept_ratio) {
                        uppy.error(
                            '請編輯照片，使其符合比例要求 (' + min_accept_ratio + ')'
                        );
                    } else if (max_accept_ratio > 0 && aspect_ratio > max_accept_ratio) {
                        uppy.error(
                            '請編輯照片，使其符合比例要求 (' + max_accept_ratio + ')'
                        );
                    } else {
                        uppy.info(
                            '照片符合比例要求'
                        );
                    }
                }
            })
            uppy.on('complete', (resultArray) => {
                console.log(
                    'complete',
                    resultArray
                )

                if (setFile)
                    setFile(resultArray);
            })
        }
    }, [uppy]);

    if (loading) return <div>loading...</div>
    return <Dashboard uppy={uppy} autoOpen={"imageEditor"}
                      locale={dashboardLocale}/>;
}

const dashboardLocale = {
    strings: {
        // When `inline: false`, used as the screen reader label for the button that closes the modal.
        closeModal: 'Close Modal',
        // Used as the screen reader label for the plus (+) button that shows the “Add more files” screen
        addMoreFiles: 'Add more files',
        addingMoreFiles: 'Adding more files',
        // Used as the header for import panels, e.g., “Import from Google Drive”.
        importFrom: 'Import from %{name}',
        // When `inline: false`, used as the screen reader label for the dashboard modal.
        dashboardWindowTitle: 'Uppy Dashboard Window (Press escape to close)',
        // When `inline: true`, used as the screen reader label for the dashboard area.
        dashboardTitle: 'Uppy Dashboard',
        // Shown in the Informer when a link to a file was copied to the clipboard.
        copyLinkToClipboardSuccess: 'Link copied to clipboard.',
        // Used when a link cannot be copied automatically — the user has to select the text from the
        // input element below this string.
        copyLinkToClipboardFallback: 'Copy the URL below',
        // Used as the hover title and screen reader label for buttons that copy a file link.
        copyLink: 'Copy link',
        back: 'Back',
        // Used as the screen reader label for buttons that remove a file.
        removeFile: 'Remove file',
        // Used as the screen reader label for buttons that open the metadata editor panel for a file.
        editFile: 'Edit file',
        // Shown in the panel header for the metadata editor. Rendered as “Editing image.png”.
        editing: 'Editing %{file}',
        // Used as the screen reader label for the button that saves metadata edits and returns to the
        // file list view.
        finishEditingFile: 'Finish editing file',
        saveChanges: 'Save changes',
        // Used as the label for the tab button that opens the system file selection dialog.
        myDevice: 'My Device',
        dropHint: 'Drop your files here',
        // Used as the hover text and screen reader label for file progress indicators when
        // they have been fully uploaded.
        uploadComplete: 'Upload complete',
        uploadPaused: 'Upload paused',
        // Used as the hover text and screen reader label for the buttons to resume paused uploads.
        resumeUpload: 'Resume upload',
        // Used as the hover text and screen reader label for the buttons to pause uploads.
        pauseUpload: 'Pause upload',
        // Used as the hover text and screen reader label for the buttons to retry failed uploads.
        retryUpload: 'Retry upload',
        // Used as the hover text and screen reader label for the buttons to cancel uploads.
        cancelUpload: 'Cancel upload',
        // Used in a title, how many files are currently selected
        xFilesSelected: {
            0: '%{smart_count} file selected',
            1: '%{smart_count} files selected',
        },
        uploadingXFiles: {
            0: 'Uploading %{smart_count} file',
            1: 'Uploading %{smart_count} files',
        },
        processingXFiles: {
            0: 'Processing %{smart_count} file',
            1: 'Processing %{smart_count} files',
        },
        // The "powered by Uppy" link at the bottom of the Dashboard.
        poweredBy: '',
        addMore: 'Add more',
        editFileWithFilename: '編輯檔案 %{file}',
        save: 'Save',
        cancel: 'Cancel',
        dropPasteFiles: '在這裏拖拉檔案或 %{browseFiles}',
        dropPasteFolders: '在這裏拖拉檔案或 %{browseFolders}',
        dropPasteBoth: '在這裏拖拉檔案或 %{browseFiles} or %{browseFolders}',
        dropPasteImportFiles: '在這裏拖拉檔案或 %{browseFiles} or import from:',
        dropPasteImportFolders: '在這裏拖拉檔案或 %{browseFolders} or import from:',
        dropPasteImportBoth:
            'Drop files here, %{browseFiles}, %{browseFolders} or import from:',
        importFiles: 'Import files from:',
        browseFiles: '選擇檔案',
        browseFolders: '選擇資料夾',
        recoveredXFiles: {
            0: 'We could not fully recover 1 file. Please re-select it and resume the upload.',
            1: 'We could not fully recover %{smart_count} files. Please re-select them and resume the upload.',
        },
        recoveredAllFiles: 'We restored all files. You can now resume the upload.',
        sessionRestored: 'Session restored',
        reSelect: 'Re-select',
        missingRequiredMetaFields: {
            0: 'Missing required meta field: %{fields}.',
            1: 'Missing required meta fields: %{fields}.',
        },
    },

}
