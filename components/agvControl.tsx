'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { initializeFirebase } from "@/lib/firebase";
import { getDatabase, onValue, ref, update } from "@firebase/database";
import { FirebaseError } from "@firebase/app";
import { MoveUpLeft, MoveDownLeft, MoveUpRight, MoveDownRight } from "lucide-react";

initializeFirebase();

const AGVControl = () => {
    const [pins, setPins] = useState<{ pin1: number; pin2: number }>({ pin1: 0, pin2: 0 });

    useEffect(() => {
        try {
            const db = getDatabase();
            const dbRef = ref(db, '/'); // ルート参照で全データを取得

            // onValueを使用してデータ全体の変更を監視
            const unsubscribe = onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setPins({
                        pin1: data.pin1?.state ?? 0,
                        pin2: data.pin2?.state ?? 0
                    });
                }
            });

            return () => unsubscribe(); // クリーンアップ
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.error(e);
            }
        }
    }, []);

    // ボタンを押したときに `state` を 1 に、離したときに 0 にする関数
    const handlePinUpdate = (pin: 'pin1' | 'pin2', state: number) => {
        try {
            const db = getDatabase();
            const pinRef = ref(db, `/${pin}`);

            update(pinRef, { state }) // `state` を更新
                .then(() => console.log(`${pin} updated to ${state}`))
                .catch((error) => console.error(`Failed to update ${pin}:`, error));
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.error(e);
            }
        }
    };

    return (
        <div>
            <div className={"flex flex-col gap-4 pb-4 w-full"}>
                {/*<Table className={"select-none"}>*/}
                {/*    <TableHeader>*/}
                {/*        <TableRow>*/}
                {/*            <TableHead>Pin</TableHead>*/}
                {/*            <TableHead>Status</TableHead>*/}
                {/*        </TableRow>*/}
                {/*    </TableHeader>*/}
                {/*    <TableBody>*/}
                {/*        <TableRow>*/}
                {/*            <TableCell>*/}
                {/*                <code className={"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"}>*/}
                {/*                    Pin 1*/}
                {/*                </code>*/}
                {/*            </TableCell>*/}
                {/*            <TableCell>*/}
                {/*                <code className={"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"}>*/}
                {/*                    {pins.pin1}*/}
                {/*                </code>*/}
                {/*            </TableCell>*/}
                {/*        </TableRow>*/}
                {/*        <TableRow>*/}
                {/*            <TableCell>*/}
                {/*                <code className={"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"}>*/}
                {/*                    Pin 2*/}
                {/*                </code>*/}
                {/*            </TableCell>*/}
                {/*            <TableCell>*/}
                {/*                <code className={"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"}>*/}
                {/*                    {pins.pin2}*/}
                {/*                </code>*/}
                {/*            </TableCell>*/}
                {/*        </TableRow>*/}
                {/*    </TableBody>*/}
                {/*</Table>*/}

            </div>
            <div className={"flex flex-row gap-4"}>
                <div className={"flex flex-col gap-4"}>
                    <Button
                        onMouseDown={() => handlePinUpdate('pin1', 1)}
                        onMouseUp={() => handlePinUpdate('pin1', 0)}
                        onTouchStart={() => handlePinUpdate('pin1', 1)}
                        onTouchEnd={() => handlePinUpdate('pin1', 0)}
                        size={"lg"}
                    >
                        <MoveUpLeft />
                    </Button>
                    <Button
                        onMouseDown={() => handlePinUpdate('pin2', 1)}
                        onMouseUp={() => handlePinUpdate('pin2', 0)}
                        onTouchStart={() => handlePinUpdate('pin2', 1)}
                        onTouchEnd={() => handlePinUpdate('pin2', 0)}
                        size={"lg"}
                    >
                        <MoveDownLeft />
                    </Button>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <Button
                        onMouseDown={() => handlePinUpdate('pin1', 1)}
                        onMouseUp={() => handlePinUpdate('pin1', 0)}
                        onTouchStart={() => handlePinUpdate('pin1', 1)}
                        onTouchEnd={() => handlePinUpdate('pin1', 0)}
                        size={"lg"}
                    >
                        <MoveUpRight />
                    </Button>
                    <Button
                        onMouseDown={() => handlePinUpdate('pin2', 1)}
                        onMouseUp={() => handlePinUpdate('pin2', 0)}
                        onTouchStart={() => handlePinUpdate('pin2', 1)}
                        onTouchEnd={() => handlePinUpdate('pin2', 0)}
                        size={"lg"}
                    >
                        <MoveDownRight />
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default AGVControl;