// src/api/optionGroups.ts
import { StatusCodes } from "http-status-codes";

import type { OptionGroup, OptionGroupCreateRequest, OptionGroupUpdateRequest } from "@/models/option-group";

import request from "./axios";

export const getOptionGroups = () =>
    request<undefined, OptionGroup[]>({
        url: "option-groups",
        method: "get",
    });

export const getOptionGroupById = (optionGroupId: number) =>
    request<undefined, OptionGroup>({
        url: `option-groups/${optionGroupId}`,
        method: "get",
    });

export const createOptionGroup = (data: OptionGroupCreateRequest) =>
    request<OptionGroupCreateRequest, OptionGroup>(
        {
            url: "option-groups",
            method: "post",
            data,
        },
        {
            [StatusCodes.FORBIDDEN]: {
                title: "Admin access required",
            },
        }
    );

export const putOptionGroup = (optionGroupId: number, data: OptionGroupUpdateRequest) =>
    request<OptionGroupUpdateRequest, OptionGroup>({
        url: `option-groups/${optionGroupId}`,
        method: "put",
        data,
    });

export const patchOptionGroup = (optionGroupId: number, data: Partial<OptionGroupUpdateRequest>) =>
    request<Partial<OptionGroupUpdateRequest>, OptionGroup>({
        url: `option-groups/${optionGroupId}`,
        method: "patch",
        data,
    });

export const deleteOptionGroup = (optionGroupId: number) =>
    request<undefined, void>({
        url: `option-groups/${optionGroupId}`,
        method: "delete",
    });
