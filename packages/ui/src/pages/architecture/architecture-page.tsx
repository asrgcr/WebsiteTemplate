import {FunctionComponent} from "react";
import {Container, TextContent} from "@cloudscape-design/components";

export const ArchitecturePage: FunctionComponent = () => {
    return (
        <Container>
            <img src={"aws_architecture.png"} alt={"AWS architecture diagram"} style={{ width: "75pc", height: "auto" }}/>
            <TextContent>
                <div>
                    <h1>Architecture</h1>
                    <h3>1. Internet</h3>
                    <p>
                        This template's architecture is accessible via the public internet. With that, customers of the website do not have to connect to VPN to access the site.
                    </p>
                    <h3>2. Route 53</h3>
                    <p>
                        This template's domain is an apex alias record in our Route 53 hosted zone.
                    </p>
                    <h3>3. Cloudfront</h3>
                    <p>
                        This template uses a CloudFront distribution to serve static files from an S3 bucket.
                    </p>
                    <h3>4. Authentication interceptor</h3>
                    <p>
                        This template is secured using an authentication lambda@edge function triggered by CloudFront
                    </p>
                    <h3>5. API Lambda</h3>
                    <p>
                        By default, this template has it's primary backend set up to resolve requests in a lambda function via a Lambda Function URL secured with IAM authentication. These requests are resolved by a tRPC server running in the Lambda function. tRPC has become one of the leading tools for developing full-stack type-safe applications by automatically managing client generation and integrating with other leading tools such as React Query.
                    </p>
                    <h3>6. UI Asset S3 Bucket</h3>
                    <p>
                        This template's static assets (like the HTML, JavaScript, and CSS) are served via an S3 bucket. This S3 bucket is encrypted at rest and its access is protected with IAM.
                    </p>
                    <h3>7. CloudWatch</h3>
                    <p>
                        All access and performance metrics are recorded in CloudWatch for security and reliability auditing.
                    </p>
                </div>
            </TextContent>
        </Container>
    )
};