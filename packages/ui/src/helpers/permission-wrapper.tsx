import {FunctionComponent, useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router";
import {Box, Spinner} from "@cloudscape-design/components";

export const PermissionWrapper: FunctionComponent = () => {
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkPermission = async () => {
            try {
                const res = await fetch("/api/getCurrentUser", {
                    credentials: "include", // include cookies
                });
                if (res.status !== 200) {
                    navigate("/unauthorized");
                }
            } catch {
                navigate("/unauthorized");
            } finally {
                setChecking(false);
            }
        };
        checkPermission();
    }, []);

    if (checking) {
        return <Spinner />;
    }
    return (
        <Box padding={"s"}>
            <Outlet />
        </Box>
    );
};