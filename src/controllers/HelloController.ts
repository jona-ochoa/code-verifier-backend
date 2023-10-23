import { Get, Query, Route, Tags } from "tsoa";
import { BasicResponse, ErrorResponse } from "./types";
import { IHelloController } from "./interfaces";
import { LogSuccess } from "../utils/logger";

@Route('/api/hello')
@Tags("HelloController")

export class HelloController implements IHelloController{
    /**
     * Endpoint to return Message "Hello {name}" in JSON
     * @param { string | undefined } name Name of user to be greeted
     * @return { BasicResponse } Promise of BasicResponse
     */
    @Get('/')
    public async getMessage(@Query()name?: string): Promise<BasicResponse> {
        LogSuccess('[/api/hello] Get request');

        return {
            message: `Hello ${name || "world"}`
        }
    }

}
