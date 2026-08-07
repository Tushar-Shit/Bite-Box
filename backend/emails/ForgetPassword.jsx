import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function ForgetPassword({ resetLink }) {
  return (
    <Html>
      <Head />
      <Preview>Reset your BiteBox password</Preview>

      <Body
        style={{
          backgroundColor: "#f4f4f5",
          fontFamily: "Arial, sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            maxWidth: "600px",
            margin: "0 auto",
            borderRadius: "12px",
            padding: "40px",
            border: "1px solid #e5e7eb",
          }}
        >
          <Heading
            style={{
              textAlign: "center",
              color: "#111827",
              marginBottom: "24px",
            }}
          >
            Reset Your Password
          </Heading>

          <Text
            style={{
              color: "#374151",
              fontSize: "16px",
              lineHeight: "26px",
            }}
          >
            Hello,
          </Text>

          <Text
            style={{
              color: "#374151",
              fontSize: "16px",
              lineHeight: "26px",
            }}
          >
            We received a request to reset the password for your BiteBox
            account.
          </Text>

          <Text
            style={{
              color: "#374151",
              fontSize: "16px",
              lineHeight: "26px",
            }}
          >
            Click the button below to create a new password. This link will
            expire in <strong>15 minutes</strong>.
          </Text>

          <Section
            style={{
              textAlign: "center",
              margin: "35px 0",
            }}
          >
            <Button
              href={resetLink}
              style={{
                backgroundColor: "#16a34a",
                color: "#ffffff",
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Reset Password
            </Button>
          </Section>

          <Text
            style={{
              color: "#6b7280",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            If you didn't request a password reset, you can safely ignore this
            email. Your password won't change unless you create a new one.
          </Text>

          <Text
            style={{
              color: "#9ca3af",
              fontSize: "12px",
              marginTop: "30px",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} BiteBox. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}