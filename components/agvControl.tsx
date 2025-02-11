'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { initializeFirebase } from "@/lib/firebase";
import { getDatabase, onValue, ref, update } from "@firebase/database";
import { FirebaseError } from "@firebase/app";

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
            <div className={"flex flex-col gap-4 pb-4"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pin</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Pin 1</TableCell>
                            <TableCell>{pins.pin1}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Pin 2</TableCell>
                            <TableCell>{pins.pin2}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </div>
            <div className={"flex flex-row gap-4"}>
                <Button
                    onMouseDown={() => handlePinUpdate('pin1', 1)}
                    onMouseUp={() => handlePinUpdate('pin1', 0)}
                    onTouchStart={() => handlePinUpdate('pin1', 1)}
                    onTouchEnd={() => handlePinUpdate('pin1', 0)}
                >
                    Hold Pin 1
                </Button>
                <Button
                    onMouseDown={() => handlePinUpdate('pin2', 1)}
                    onMouseUp={() => handlePinUpdate('pin2', 0)}
                    onTouchStart={() => handlePinUpdate('pin2', 1)}
                    onTouchEnd={() => handlePinUpdate('pin2', 0)}
                >
                    Hold Pin 2
                </Button>
            </div>
        </div>
    );
};

export default AGVControl;