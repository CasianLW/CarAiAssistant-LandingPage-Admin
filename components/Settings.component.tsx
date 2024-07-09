import React, { useState, useEffect, FC, ChangeEvent } from "react";
import { useApiHelper } from "@/helpers/api-helper.hook";

enum AIType {
  Mistral = "mistral",
  Claude = "claude",
  OpenAI = "openai",
}

enum AIModel {
  Mistral_7b = "open-mistral-7b",
  Mistral_8x7b = "open-mistral-8x7b",
  Mistral_8x22b = "open-mistral-8x22b",
  Mistral_Largest = "mistral-large-latest",
  Claude_Haiku = "claude-3-haiku-20240307",
  Claude_Sonnet = "claude-3-sonnet-20240229",
  Claude_Opus = "claude-3-opus-20240229",
  OpenAI_Turbo = "gpt-3.5-turbo",
  OpenAI_GPT4o = "gpt-4o",
  OpenAI_GPT4Turbo = "gpt-4-turbo",
}

interface AppSettings {
  aiSelected: AIType;
  modelForMistral: AIModel;
  modelForClaude: AIModel;
  modelForOpenAI: AIModel;
}

const modelMapping: Record<AIType, keyof AppSettings> = {
  [AIType.Mistral]: "modelForMistral",
  [AIType.Claude]: "modelForClaude",
  [AIType.OpenAI]: "modelForOpenAI",
};

export const Settings: FC = () => {
  const { sendRequest } = useApiHelper();
  const [settings, setSettings] = useState<AppSettings>({
    aiSelected: AIType.Mistral,
    modelForMistral: AIModel.Mistral_Largest,
    modelForClaude: AIModel.Claude_Haiku,
    modelForOpenAI: AIModel.OpenAI_Turbo,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await sendRequest({
          url: `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
          }/app-settings`,
        });
        setSettings({
          aiSelected:
            AIType[data.aiSelected as keyof typeof AIType] || AIType.Mistral,
          modelForMistral:
            AIModel[data.modelForMistral as keyof typeof AIModel] ||
            AIModel.Mistral_7b,
          modelForClaude:
            AIModel[data.modelForClaude as keyof typeof AIModel] ||
            AIModel.Claude_Haiku,
          modelForOpenAI:
            AIModel[data.modelForOpenAI as keyof typeof AIModel] ||
            AIModel.OpenAI_Turbo,
        });
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchSettings();
  }, [sendRequest]);

  const handleAITypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newAIType = e.target.value as AIType;
    setSettings((prev) => ({
      ...prev,
      aiSelected: newAIType,
      // Reset models based on selected AI type
      modelForMistral:
        newAIType === AIType.Mistral
          ? prev.modelForMistral
          : AIModel.Mistral_7b,
      modelForClaude:
        newAIType === AIType.Claude
          ? prev.modelForClaude
          : AIModel.Claude_Haiku,
      modelForOpenAI:
        newAIType === AIType.OpenAI
          ? prev.modelForOpenAI
          : AIModel.OpenAI_Turbo,
    }));
  };

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value as AIModel }));
  };

  const saveSettings = async () => {
    try {
      await sendRequest({
        url: `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
        }/app-settings`,
        method: "PATCH",
        body: settings,
      });
      alert("Settings updated successfully.");
    } catch (error) {
      console.error("Failed to update settings:", error);
      alert("Failed to update settings.");
    }
  };

  return (
    <div className="max-w-[400px] ">
      {/* <button onClick={() => console.log(settings)}>log me</button> */}
      <h2 className="text-lg font-bold text-black">App Settings</h2>
      <div className="mt-4">
        <label className="text-black" htmlFor="aiSelected">
          AI Selected:
        </label>
        <select
          className="p-1 text-black"
          name="aiSelected"
          value={settings.aiSelected}
          onChange={handleAITypeChange}
        >
          {Object.values(AIType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {Object.values(AIType).map((aiType) => (
        <div key={aiType} className="my-2">
          <label className="text-black" htmlFor={modelMapping[aiType]}>
            Model for {aiType}:
          </label>
          <select
            className="p-1 text-black"
            name={modelMapping[aiType]}
            value={settings[modelMapping[aiType]]}
            onChange={handleModelChange}
            disabled={settings.aiSelected !== aiType}
          >
            {Object.values(AIModel)
              .filter((model) => {
                if (aiType === AIType.OpenAI) {
                  return model.toLowerCase().includes("open");
                }
                return model.toLowerCase().includes(aiType.toLowerCase());
              })
              .map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
        </div>
      ))}
      <button
        onClick={saveSettings}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Settings
      </button>
    </div>
  );
};
