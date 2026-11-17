
import React, { useEffect, useRef } from "react";
import { TalkingAvatar } from "@interviewflowai/talking-avatar";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { getTheme } from "../../theme";

interface AvatarPreviewProps {
    questionText: string;
    audioUrl?: string;
}

const AvatarPreview = ({
    questionText,
    audioUrl
}: AvatarPreviewProps) => {
    const avatarRef = useRef<TalkingAvatar | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const themeMode = useSelector(
        (state: RootState) => state.theme.mode
    );

    const colors = getTheme(themeMode).colors;

    // Initialize avatar
    useEffect(() => {
        if (!containerRef.current) return;

        const avatar = new TalkingAvatar({
            container: containerRef.current,
            avatarUrl: "/sdk/avatars/female.glb",
            modelUrl: "/sdk/viseme-model.bin",
            onError: (error) => {
                console.error("Avatar loading error:", error);
            }
        });

        avatarRef.current = avatar;

        avatar.ready.catch((error) => {
            console.error("Avatar initialization failed:", error);
        });

        return () => {
            avatarRef.current = null;
            avatar.dispose();
        };
    }, []);

    // Automatically speak the question when audio is available
    useEffect(() => {
        const speakQuestion = async () => {
            if (!audioUrl || !questionText.trim()) return;

            try {
                const avatar = avatarRef.current;

                if (!avatar) return;

                await avatar.ready;
                await avatar.speak(audioUrl);
            } catch (error) {
                console.error("Question playback error:", error);
            }
        };

        speakQuestion();

        return () => {
            avatarRef.current?.stopSpeaking();
        };
    }, [questionText, audioUrl]);

    // Manual test voice
    const handleTestVoice = async () => {
        try {
            const avatar = avatarRef.current;

            if (!avatar) return;

            await avatar.ready;
            await avatar.speak("/audio/test-question.m4a");
        } catch (error) {
            console.error("Test voice error:", error);
        }
    };

    return (
        <>
            <div
                ref={containerRef}
                style={{
                    width: "100%",
                    height: "380px",
                    overflow: "hidden",
                    borderRadius: 16,
                    backgroundColor: colors.surface
                }}
            />

            <button
                onClick={handleTestVoice}
                style={{
                    marginTop: 12,
                    padding: 12,
                    width: "100%",
                    backgroundColor: colors.primary,
                    color: colors.white,
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 16
                }}
            >
                Test Voice
            </button>
        </>
    );
};

export default AvatarPreview;
